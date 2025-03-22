import { makeAutoObservable } from 'mobx'

class Data {
    file: File | null = null
    name: string | undefined
    isChangeName: boolean = true
    constructor() {
        makeAutoObservable(this)
    }
    setFile(file: File | null) {
        this.file = file
    }
    reverseIsChangeName() {
        this.isChangeName = !this.isChangeName
    }
}
const data = new Data()
export default data
