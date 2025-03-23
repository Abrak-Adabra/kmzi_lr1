import { makeAutoObservable } from 'mobx'
import err from './errors'
class Keys {
    private db: IDBDatabase | undefined

    constructor() {
        if (typeof indexedDB == 'undefined') return
        const openRequest = indexedDB.open('kmzi_lr1')
        const createDb: Promise<IDBDatabase> = new Promise((resolve) => {
            openRequest.onupgradeneeded = function () {
                openRequest.result.createObjectStore('keyPairs', { keyPath: 'name' })
                openRequest.result.createObjectStore('publicKeys', { keyPath: 'name' })
            }
            openRequest.onsuccess = function () {
                resolve(openRequest.result)
            }
        })
        Promise.resolve(createDb).then((db) => (this.db = db))
        makeAutoObservable(this)
    }

    transaction() {
        return this.db?.transaction(['keyPairs', 'publicKeys'], 'readwrite')
    }

    uniq(name: string) {
        return Promise.resolve(
            new Promise<boolean>((resolve) => {
                const request = this.transaction()?.objectStore('keyPairs').get(name)
                if (request) {
                    request.onsuccess = () => {
                        resolve(!request.result)
                    }
                }
            })
        )
    }

    generateKeyPairs(name: string) {
        if (!name) return
        crypto.subtle
            .generateKey(
                {
                    name: 'ECDSA',
                    namedCurve: 'P-256',
                },
                false,
                ['sign', 'verify']
            )
            .then((keyPairECDSA) => {
                crypto.subtle
                    .generateKey(
                        {
                            name: 'RSA-PSS',
                            modulusLength: 2048,
                            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                            hash: 'SHA-256',
                        },
                        false,
                        ['sign', 'verify']
                    )
                    .then((keyPairRSA) => {
                        this.transaction()?.objectStore('keyPairs').add({ name, ecdsa: keyPairECDSA, rsa: keyPairRSA })
                    })
            })
    }

    async downloadSignedText(name: string, text: string) {
        if (!name) return
        const encoder = new TextEncoder()
        const textData = encoder.encode(text)
        const nameData = encoder.encode(name)
        const hash = await crypto.subtle.digest('SHA-512', textData)
        const privateKeyECDSA = await Promise.resolve(
            new Promise<CryptoKey>((resolve) => {
                const request = this.transaction()?.objectStore('keyPairs').get(name) as unknown as IDBRequest<{
                    ecdsa: CryptoKeyPair
                }>
                if (request) {
                    request.onsuccess = () => {
                        resolve(request.result.ecdsa.privateKey)
                    }
                }
            })
        )
        const signature = await crypto.subtle.sign(
            {
                name: 'ECDSA',
                hash: { name: 'SHA-256' },
            },
            privateKeyECDSA,
            hash
        )
        const signatureData = new Uint8Array(signature)
        const data = [Uint8Array.from([nameData.length, signatureData.length]), nameData, signatureData, textData]
        const signedText = new Blob(data, {
            type: 'application/octet-stream',
        })
        const url = URL.createObjectURL(signedText)
        const a = document.createElement('a')
        a.href = url
        a.download = 'signed_data.sd'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    async downloadPublicKey(name: string) {
        if (!name) return
        const encoder = new TextEncoder()
        const nameData = encoder.encode(name)
        const publicKeyECDSA = await Promise.resolve(
            new Promise<ArrayBuffer>((resolve) => {
                const request = this.transaction()?.objectStore('keyPairs').get(name) as unknown as IDBRequest<{
                    ecdsa: CryptoKeyPair
                }>
                if (request) {
                    request.onsuccess = () => {
                        crypto.subtle.exportKey('spki', request.result.ecdsa.publicKey).then((key) => {
                            resolve(key)
                        })
                    }
                }
            })
        )
        const data = [Uint8Array.from([nameData.byteLength, publicKeyECDSA.byteLength]), nameData, publicKeyECDSA]
        const PK = new Blob(data, { type: 'application/octet-stream' })
        const url = URL.createObjectURL(PK)
        const a = document.createElement('a')
        a.href = url
        a.download = name + '.pub'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    async signPublicKey(keyFile: File, name: string) {
        const bytes = new Uint8Array(
            await Promise.resolve(
                new Promise<ArrayBuffer>((resolve) => {
                    const reader = new FileReader()
                    reader.readAsArrayBuffer(keyFile)
                    reader.onload = () => {
                        if (typeof reader.result != 'string' && reader.result != null) resolve(reader.result)
                    }
                })
            )
        )
        const hash = await crypto.subtle.digest('SHA-1', bytes)
        const privateKeyRSA = await Promise.resolve(
            new Promise<CryptoKey>((resolve) => {
                const request = this.transaction()?.objectStore('keyPairs').get(name) as unknown as IDBRequest<{
                    rsa: CryptoKeyPair
                }>
                if (request) {
                    request.onsuccess = () => {
                        resolve(request.result.rsa.privateKey)
                    }
                }
            })
        )
        const signature = await crypto.subtle.sign(
            {
                name: 'RSA-PSS',
                saltLength: 32,
            },
            privateKeyRSA,
            hash
        )
        const signedKey = Uint8Array.from([...bytes, ...new Uint8Array(signature)])
        this.transaction()?.objectStore('publicKeys').put({ name, signedKey })
    }

    async importSignedText(textFile: File, name: string) {
        const signedPublicKeyECDSA = await Promise.resolve(
            new Promise<Uint8Array>((resolve) => {
                const request = this.transaction()?.objectStore('publicKeys').get(name)
                if (request) {
                    request.onsuccess = () => {
                        resolve(request.result.signedKey)
                    }
                }
            })
        )
        const publicKeyECDSA = signedPublicKeyECDSA.slice(0, signedPublicKeyECDSA[0] + signedPublicKeyECDSA[1] + 2)
        const signature = signedPublicKeyECDSA.slice(signedPublicKeyECDSA[0] + signedPublicKeyECDSA[1] + 2)
        const hash_key = await crypto.subtle.digest('SHA-1', publicKeyECDSA)
        const publicKeyRSA = await Promise.resolve(
            new Promise<CryptoKey>((resolve) => {
                const request = this.transaction()?.objectStore('keyPairs').get(name) as unknown as IDBRequest<{
                    rsa: CryptoKeyPair
                }>
                if (request) {
                    request.onsuccess = () => {
                        resolve(request.result.rsa.publicKey)
                    }
                }
            })
        )
        const publicKeyIsValid = await crypto.subtle.verify(
            {
                name: 'RSA-PSS',
                saltLength: 32,
            },
            publicKeyRSA,
            signature,
            hash_key
        )
        if (!publicKeyIsValid) {
            err.setError('Публичный ключ был подменён')
            return false
        }
        const bytes = new Uint8Array(
            await Promise.resolve(
                new Promise<ArrayBuffer>((resolve) => {
                    const reader = new FileReader()
                    reader.readAsArrayBuffer(textFile)
                    reader.onload = () => {
                        if (typeof reader.result != 'string' && reader.result != null) resolve(reader.result)
                    }
                })
            )
        )
        const decoder = new TextDecoder()
        const author_key = decoder.decode(publicKeyECDSA.slice(2, publicKeyECDSA[0] + 2))
        const author_text = decoder.decode(bytes.slice(2, bytes[0] + 2))
        if (author_key != author_text) {
            err.setError('Авторы импортированного ключа и текста не совпадают')
            return false
        }
        const publicKeyWithoutTrashECDSA = await crypto.subtle.importKey(
            'spki',
            publicKeyECDSA.slice(2 + publicKeyECDSA[0]),
            {
                name: 'ECDSA',
                namedCurve: 'P-256',
            },
            true,
            ['verify']
        )
        const bytes_signature = bytes.slice(2 + bytes[0], 2 + bytes[0] + bytes[1])
        const bytes_text = bytes.slice(2 + bytes[0] + bytes[1])
        console.log(bytes, bytes_signature)
        const hash_bytes = await crypto.subtle.digest('SHA-512', bytes_text)
        const documentIsValid = await crypto.subtle.verify(
            {
                name: 'ECDSA',
                hash: { name: 'SHA-256' },
            },
            publicKeyWithoutTrashECDSA,
            bytes_signature,
            hash_bytes
        )
        if (!documentIsValid) {
            err.setError('Подпись и/или документ не действительны')
            return false
        }
        return decoder.decode(bytes_text)
    }

    deleteKeyPairs(name: string) {
        this.transaction()?.objectStore('keyPairs').delete(name)
    }
}
const keys = new Keys()
export default keys
