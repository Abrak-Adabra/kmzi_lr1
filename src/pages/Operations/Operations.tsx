import Button from '@/ui-kit/Button/Button'
import style from './operations.module.scss'

export default function Operations() {
    return (
        <>
            <div className={style['row']}>
                <div className={style['col']}>
                    <h3>Имя пользователя</h3>
                    <input className={style['input']}></input>
                </div>
                <div className={style['col']}>
                    <Button title="Выбрать пользователя" />
                </div>
                <div className={style['col']}>
                    <Button title="Загрузить документ" />
                </div>
                <div className={style['col']}>
                    <Button title="Сохранить документ" />
                </div>
            </div>
            <textarea className={style['textarea']} rows={25} />
        </>
    )
}
