import { useState } from 'react'
import Navbar from '@/ui-kit/components/Navbar/Navbar'
import Modal from '@/ui-kit/components/Modal/Modal'
import data from '@/store/data'
import keys from '@/store/keys'
import err from '@/store/errors'

export default function Header() {
    const [aboutModal, setAboutModal] = useState<boolean>(false)

    return (
        <Navbar>
            <Navbar.List>
                <Navbar.Item custom_title="Файл">
                    <Navbar.Elem
                        custom_title="Создать"
                        onClick={() => {
                            data.setText('')
                            data.setIsOpenWithPublic(false)
                        }}
                    />
                    <Navbar.Elem
                        custom_title={
                            <>
                                Загрузить
                                <input
                                    style={{ opacity: 0, position: 'absolute', width: '90%', cursor: 'pointer' }}
                                    type="file"
                                    onChange={(e) => {
                                        data.setFile(e.target.files && e.target.files[0])
                                        if (data.isChangeName) err.setError('Сначала выберете пользователя')
                                        if (data.file && !data.isChangeName) {
                                            keys.importSignedText(data.file, data.name).then((result) => {
                                                if (!!result) {
                                                    data.setIsOpenWithPublic(true)
                                                    data.setText(result)
                                                }
                                            })
                                        }
                                    }}
                                />
                            </>
                        }
                    />
                    <Navbar.Elem
                        custom_title="Сохранить"
                        onClick={() => {
                            if (data.isChangeName) err.setError('Сначала выберете пользователя')
                            else if (!data.text) err.setError('Текст не должен быть пустым')
                            else keys.downloadSignedText(data.name, data.text)
                        }}
                    />
                </Navbar.Item>
                <Navbar.Item custom_title="Управление ключами">
                    <Navbar.Elem
                        custom_title="Экспорт открытого ключа"
                        onClick={() => {
                            if (data.isChangeName) err.setError('Сначала выберете пользователя')
                            else keys.downloadPublicKey(data.name)
                        }}
                    />
                    <Navbar.Elem
                        custom_title={
                            <>
                                Импорт открытого ключа
                                <input
                                    style={{ opacity: 0, position: 'absolute', width: '90%', cursor: 'pointer' }}
                                    type="file"
                                    onChange={(e) => {
                                        data.setFile(e.target.files && e.target.files[0])
                                        if (data.file && data.name) keys.signPublicKey(data.file, data.name)
                                    }}
                                    onFocus={() => {
                                        if (data.isChangeName) err.setError('Сначала выберете пользователя')
                                    }}
                                />
                            </>
                        }
                    />
                    <Navbar.Elem
                        custom_title="Выбор закрытого ключа"
                        onClick={() => {
                            if (!data.name) return
                            keys.uniq(data.name).then((isUnique) => {
                                if (isUnique) {
                                    keys.generateKeyPairs(data.name)
                                }
                            })
                            data.reverseIsChangeName()
                        }}
                    />
                    <Navbar.Elem
                        custom_title="Удаление пары ключей"
                        onClick={() => {
                            if (!data.isChangeName) {
                                keys.deleteKeyPairs(data.name)
                                data.setName('')
                                data.reverseIsChangeName()
                            } else {
                                err.setError('Сначала выберете пользователя')
                            }
                        }}
                    />
                </Navbar.Item>
                <Navbar.Item custom_title="О программе" onClick={() => setAboutModal(true)} />
            </Navbar.List>
            {aboutModal && <Modal custom_title="О программе" onClose={() => setAboutModal(false)} />}
        </Navbar>
    )
}
