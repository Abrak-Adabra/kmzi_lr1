import Button from '@/ui-kit/components/Button/Button'
import style from './operations.module.scss'
import { observer } from 'mobx-react-lite'
import data from '@/store/data'
import keys from '@/store/keys'
import err from '@/store/errors'

const Operations = observer(() => {
    return (
        <>
            <div className={style['row']}>
                <div className={style['col']}>
                    <h3>Имя пользователя</h3>
                    <input
                        value={data.name}
                        className={style['input']}
                        disabled={!data.isChangeName}
                        onChange={(e) => data.setName(e.target.value.trim().toLowerCase())}
                    ></input>
                </div>
                <div className={style['col']}>
                    <Button
                        custom_title="Выбрать пользователя"
                        onClick={() => {
                            if (!data.name) {
                                err.setError('У пользователя не может быть пустое имя')
                                return
                            }
                            keys.uniq(data.name).then((isUnique) => {
                                if (isUnique) {
                                    keys.generateKeyPairs(data.name)
                                }
                            })
                            data.reverseIsChangeName()
                        }}
                    />
                </div>
                <div className={style['col']}>
                    <Button
                        style={{ position: 'relative' }}
                        custom_title={
                            <>
                                Загрузить
                                <input
                                    style={{ opacity: 0, position: 'absolute', width: '90%', cursor: 'pointer' }}
                                    type="file"
                                    onChange={(e) => {
                                        data.setFile(e.target.files && e.target.files[0])
                                        if (data.isChangeName) err.setError('Сначала выберете пользователя')
                                        if (data.file && !data.isChangeName) {
                                            keys.importSignedText(data.file, data.name).then((result) => {
                                                if (!!result) {
                                                    data.setIsOpenWithPublic(true)
                                                    data.setText(result)
                                                }
                                            })
                                        }
                                    }}
                                    onFocus={() => {
                                        if (data.isChangeName) err.setError('Сначала выберете пользователя')
                                    }}
                                />
                            </>
                        }
                    />
                </div>
                <div className={style['col']}>
                    <Button
                        custom_title="Сохранить документ"
                        onClick={() => {
                            if (!data.isChangeName) keys.downloadSignedText(data.name, data.text)
                            else err.setError('Сначала выберете пользователя')
                        }}
                    />
                </div>
            </div>
            <textarea
                value={data.text}
                className={style['textarea']}
                rows={25}
                onChange={(e) => data.setText(e.target.value)}
                disabled={data.isOpenWithPublic}
            />
        </>
    )
})
export default Operations
