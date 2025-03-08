import { useState } from 'react'
import Navbar from '@/ui-kit/components/Navbar/Navbar'
import Modal from '@/ui-kit/components/Modal/Modal'

export default function Header() {
    const [aboutModal, setAboutModal] = useState<boolean>(false)
    return (
        <Navbar>
            <Navbar.List>
                <Navbar.Item title="Файл">
                    <Navbar.Elem title="Загрузить" />
                    <Navbar.Elem title="Сохранить">
                        <Navbar.Elem title="Как файл" />
                        <Navbar.Elem title="Как файл" />
                        <Navbar.Elem title="Как файл">
                            <Navbar.Elem title="Как файл" />
                            <Navbar.Elem title="Как файл" />
                        </Navbar.Elem>
                        <Navbar.Elem title="Как файл" />
                        <Navbar.Elem title="Как файл" />
                    </Navbar.Elem>
                </Navbar.Item>
                <Navbar.Item title="Управление ключами">
                    <Navbar.Elem title="Экспорт открытого ключа" />
                    <Navbar.Elem title="Импорт открытого ключа" />
                    <Navbar.Elem title="Выбор закрытого ключа" />
                    <Navbar.Elem title="Удаление пары ключей" />
                </Navbar.Item>
                <Navbar.Item title="О программе" onClick={() => setAboutModal(true)} />
            </Navbar.List>
            {aboutModal && <Modal title="О программе" onClose={() => setAboutModal(false)} />}
        </Navbar>
    )
}
