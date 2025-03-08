import Navbar from '@/ui-kit/components/Navbar/Navbar'

export default function Header() {
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
                <Navbar.Item title="О программе" />
            </Navbar.List>
        </Navbar>
    )
}
