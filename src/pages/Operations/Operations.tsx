import Button from '@/ui-kit/components/Button/Button'
import style from './operations.module.scss'
import { observer } from 'mobx-react-lite'
import data from '@/store/data'
import { useState } from 'react'
import keys from '@/store/keys'
import mock from './mockText.json'

const Operations = observer(() => {
    const [name, setName] = useState<string>('')
    return (
        <>
            <div className={style['row']}>
                <div className={style['col']}>
                    <h3>Имя пользователя</h3>
                    <input
                        className={style['input']}
                        disabled={!data.isChangeName}
                        onChange={(e) => setName(e.target.value.trim().toLowerCase())}
                    ></input>
                </div>
                <div className={style['col']}>
                    <Button
                        custom_title="Выбрать пользователя"
                        onClick={() => {
                            if (!name) return
                            keys.uniq(name).then((isUnique) => {
                                if (isUnique) {
                                    keys.generateKeyPairs(name)
                                }
                            })
                            data.reverseIsChangeName()
                        }}
                    />
                </div>
                <div className={style['col']}>
                    <Button custom_title="Загрузить документ" />
                </div>
                <div className={style['col']}>
                    <Button custom_title="Сохранить документ" />
                </div>
            </div>
            <textarea className={style['textarea']} rows={25} defaultValue={mock.text} />
        </>
    )
})
export default Operations
