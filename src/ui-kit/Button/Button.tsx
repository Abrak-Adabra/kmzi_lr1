import style from './button.module.scss'

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
    title: string
}

const Button: React.FC<ButtonProps> = ({ title, ...props }) => {
    return (
        <button className={style['container']} {...props}>
            {title}
        </button>
    )
}
export default Button
