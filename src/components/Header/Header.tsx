import Navbar from '@/ui-kit/Navbar/Navbar'

export default function Header() {
    return (
        <Navbar>
            <Navbar.List>
                <Navbar.Item title="пункт 1"></Navbar.Item>
                <Navbar.Item title="пункт 2">
                    <Navbar.Elem title="123"></Navbar.Elem>
                </Navbar.Item>
            </Navbar.List>
        </Navbar>
    )
}
