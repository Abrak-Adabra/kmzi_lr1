import { useState } from 'react'
import style from './item.module.scss'

type ItemProps = { children?: React.ReactNode; title: string; onClick?: () => void }

const Item: React.FC<ItemProps> = ({ children, title, onClick }) => {
    const [showChild, setShowChild] = useState<boolean>(false)
    return (
        <div
            className={style['container']}
            onMouseEnter={() => setShowChild(true)}
            onMouseLeave={() => setShowChild(false)}
            onClick={onClick ? onClick : () => {}}
        >
            <div className={style['title']}>{title}</div>
            <div className={style['arrow']}>{!!children && (showChild ? '⏷' : '⏵')}</div>

            <div className={style['children']}>{showChild && children}</div>
        </div>
    )
}
export default Item
