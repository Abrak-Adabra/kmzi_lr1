import { makeAutoObservable } from 'mobx'

class Errors {
    text: string | undefined = ''
    isShown: boolean = false
    constructor() {
        makeAutoObservable(this)
    }
    setError(text: string) {
        this.text = text
        this.isShown = !!text
    }
}
const err = new Errors()
export default err
