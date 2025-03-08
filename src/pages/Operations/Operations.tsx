import Button from '@/ui-kit/components/Button/Button'
import style from './operations.module.scss'
import { useState } from 'react'
import Modal from '@/ui-kit/components/Modal/Modal'

export default function Operations() {
    const [chooseUserModal, setChooseUserModal] = useState<boolean>(false)
    return (
        <>
            <div className={style['row']}>
                <div className={style['col']}>
                    <h3>Имя пользователя</h3>
                    <input className={style['input']}></input>
                </div>
                <div className={style['col']}>
                    <Button title="Выбрать пользователя" onClick={() => setChooseUserModal(true)} />
                </div>
                <div className={style['col']}>
                    <Button title="Загрузить документ" />
                </div>
                <div className={style['col']}>
                    <Button title="Сохранить документ" />
                </div>
            </div>
            <textarea className={style['textarea']} rows={25} />
            {chooseUserModal && <Modal onClose={() => setChooseUserModal(false)}>123</Modal>}
        </>
    )
}
