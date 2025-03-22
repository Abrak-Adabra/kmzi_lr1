import { useState } from 'react'
import Navbar from '@/ui-kit/components/Navbar/Navbar'
import Modal from '@/ui-kit/components/Modal/Modal'
import data from '@/store/data'

export default function Header() {
    const [aboutModal, setAboutModal] = useState<boolean>(false)

    return (
        <Navbar>
            <Navbar.List>
                <Navbar.Item custom_title="Файл">
                    <Navbar.Elem custom_title="Создать" />
                    <Navbar.Elem custom_title="Загрузить" />
                    <Navbar.Elem custom_title="Сохранить" />
                </Navbar.Item>
                <Navbar.Item custom_title="Управление ключами">
                    <Navbar.Elem custom_title="Экспорт открытого ключа" />
                    <Navbar.Elem
                        custom_title={
                            <>
                                Импорт открытого ключа
                                <input
                                    style={{ opacity: 0, position: 'absolute', width: '90%', cursor: 'pointer' }}
                                    type="file"
                                    onChange={(e) => {
                                        data.setFile(e.target.files && e.target.files[0])
                                    }}
                                />
                            </>
                        }
                    />
                    <Navbar.Elem custom_title="Выбор закрытого ключа" />
                    <Navbar.Elem custom_title="Удаление пары ключей" />
                </Navbar.Item>
                <Navbar.Item custom_title="О программе" onClick={() => setAboutModal(true)} />
            </Navbar.List>
            {aboutModal && <Modal custom_title="О программе" onClose={() => setAboutModal(false)} />}
        </Navbar>
    )
}
