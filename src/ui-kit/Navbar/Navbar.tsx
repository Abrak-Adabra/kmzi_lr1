import Item from './Item/Item'
import List from './List/List'
import Elem from './Elem/Elem'
import style from './navbar.module.scss'

type NavbarExtensions = {
    List: typeof List
    Item: typeof Item
    Elem: typeof Elem
}

type NavbarProps = {
    children: React.ReactNode
}

const Navbar: React.FC<NavbarProps> & NavbarExtensions = ({ children }) => {
    return <header className={style['container']}>{children}</header>
}
export default Navbar

Navbar.List = List
Navbar.Item = Item
Navbar.Elem = Elem
