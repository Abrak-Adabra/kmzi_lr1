import { makeAutoObservable } from 'mobx'
class Keys {
    db: IDBDatabase | undefined
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
    deleteKeyPairs(name: string) {
        this.transaction()?.objectStore('keyPairs').delete(name)
    }
}
const keys = new Keys()
export default keys
