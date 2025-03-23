import style from './list.module.scss'

interface ListProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string
}

const List: React.FC<ListProps> = ({ children, ...props }) => {
    return (
        <div className={style['container'] + ' ' + (props.className || '')} {...props}>
            {children}
        </div>
    )
}
export default List
