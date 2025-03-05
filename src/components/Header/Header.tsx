import Navbar from '@/ui-kit/Navbar/Navbar'

export default function Header() {
    return (
        <Navbar>
            <Navbar.List>
                <Navbar.Item title="Файл">
                    <Navbar.Elem title="Сохранить" />
                    <Navbar.Elem title="Загрузить" />
                </Navbar.Item>
                <Navbar.Item title="Управление ключами">
                    <Navbar.Elem title="Экспорт открытого ключа"></Navbar.Elem>
                    <Navbar.Elem title="Импорт открытого ключа"></Navbar.Elem>
                    <Navbar.Elem title="Выбор закрытого ключа"></Navbar.Elem>
                    <Navbar.Elem title="Удаление пары ключей"></Navbar.Elem>
                </Navbar.Item>
                <Navbar.Item title="О программе" />
            </Navbar.List>
        </Navbar>
    )
}
