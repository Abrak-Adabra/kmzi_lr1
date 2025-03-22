import style from './button.module.scss'

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
    custom_title: string
}

const Button: React.FC<ButtonProps> = ({ custom_title, ...props }) => {
    return (
        <button className={style['container']} {...props}>
            {custom_title}
        </button>
    )
}
export default Button
