import { createPortal } from 'react-dom'
import style from './modal.module.scss'

type ModalProps = {
    custom_title?: string
    onClose: () => void
    children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ custom_title, children, onClose }) => {
    return (
        <>
            {createPortal(
                <div className={style['container']}>
                    <div className={style['window']}>
                        <div className={style['header']}>
                            <h2 style={{ margin: 0 }}>{custom_title}</h2>
                            <div className={style['close-button']} onClick={onClose}>
                                ✖
                            </div>
                        </div>
                        {children}
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}
export default Modal
