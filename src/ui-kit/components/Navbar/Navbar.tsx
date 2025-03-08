import Item from './Item/Item'
import List from './List/List'
import Elem from './Elem/Elem'
import style from './navbar.module.scss'

type NavbarExtensions = {
    List: typeof List
    Item: typeof Item
    Elem: typeof Elem
}

interface NavbarProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string
}

const Navbar: React.FC<NavbarProps> & NavbarExtensions = ({ children, ...props }) => {
    return (
        <header className={style['container'] + ' ' + props.className} {...props}>
            {children}
        </header>
    )
}
export default Navbar

Navbar.List = List
Navbar.Item = Item
Navbar.Elem = Elem
