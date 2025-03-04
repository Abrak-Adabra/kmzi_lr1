import { useState } from 'react'
import style from './item.module.scss'

type ItemProps = { children?: React.ReactNode; title: string }

const Item: React.FC<ItemProps> = ({ children, title }) => {
    const [showChild, setShowChild] = useState<boolean>(false)
    return (
        <div
            className={style['container']}
            onMouseEnter={() => setShowChild(true)}
            onMouseLeave={() => setShowChild(false)}
        >
            <div className={style['title']}>{title}</div>

            <div className={style['children']}>{showChild && children}</div>
        </div>
    )
}
export default Item
