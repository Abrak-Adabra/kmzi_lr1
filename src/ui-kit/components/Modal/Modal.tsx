import { createPortal } from 'react-dom'
import style from './modal.module.scss'
import { useEffect, useState } from 'react'

type ModalProps = {
    title?: string
    onClose: () => void
    children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true) // Ensures this component is only rendered on client
    }, [])
    if (isClient)
        return (
            <>
                {createPortal(
                    <div className={style['container']}>
                        <div className={style['window']}>
                            <div className={style['close-button']} onClick={onClose}>
                                ✖
                            </div>
                            <h2>{title}</h2>
                            {children}
                        </div>
                    </div>,
                    document.body
                )}
            </>
        )
}
export default Modal
