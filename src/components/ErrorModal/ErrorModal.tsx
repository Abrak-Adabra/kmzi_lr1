import error from '@/store/errors'
import Modal from '@/ui-kit/components/Modal/Modal'
import { observer } from 'mobx-react-lite'

const ErrorModal = observer(() => {
    return (
        error.isShown && (
            <Modal
                onClose={() => {
                    error.setError('')
                }}
                custom_title="Ошибка"
            >
                {error.text}
            </Modal>
        )
    )
})
export default ErrorModal
