import { makeAutoObservable } from 'mobx'

class Data {
    file: File | null = null
    name: string = ''
    author: string = ''
    text: string = ''
    isChangeName: boolean = true
    isOpenWithPublic: boolean = false
    constructor() {
        makeAutoObservable(this)
    }
    setFile(file: File | null) {
        this.file = file
    }
    setName(name: string) {
        this.name = name
    }
    setAuthor(author: string) {
        this.author = author
    }
    setText(text: string) {
        this.text = text
    }
    reverseIsChangeName() {
        this.isChangeName = !this.isChangeName
    }
    setIsOpenWithPublic(value: boolean) {
        this.isOpenWithPublic = value
    }
}
const data = new Data()
export default data
