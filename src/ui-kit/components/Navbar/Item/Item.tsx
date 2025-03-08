import { useState } from 'react'
import style from './item.module.scss'

interface ItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    title: string
    onClick?: () => void
    className?: string
    titleClassName?: string
    childClassName?: string
}

const Item: React.FC<ItemProps> = ({ children, title, onClick, ...props }) => {
    const [showChild, setShowChild] = useState<boolean>(false)
    const [showChildConst, setShowChildConst] = useState<boolean>(false)
    return (
        <div
            className={style['container'] + ' ' + props.className}
            onMouseEnter={() => setShowChild(true)}
            onMouseLeave={() => setShowChild(false)}
            onClick={onClick ? onClick : () => {}}
            {...props}
        >
            <div
                className={style['title'] + ' ' + props.titleClassName}
                onClick={() => {
                    if (!!children) setShowChildConst((cur) => !cur)
                }}
            >
                {showChildConst ? '🖈' : ''}
                {title}
                <div className={style['arrow']}>{!!children && (showChild || showChildConst ? '⏷' : '⏵')}</div>
            </div>
            {!!children && (showChild || showChildConst) && (
                <div className={style['child-container']}>
                    <div className={style['children'] + ' ' + props.childClassName}>{children}</div>
                </div>
            )}
        </div>
    )
}
export default Item
