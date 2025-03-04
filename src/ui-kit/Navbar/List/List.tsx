import style from './list.module.scss'

type ListProps = {
    children: React.ReactNode
}

const List: React.FC<ListProps> = ({ children }) => {
    return <div className={style['container']}>{children}</div>
}
export default List
