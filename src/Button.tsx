
type ButtonType = {
    title: string,
    onClick: () => void
    disabled?: boolean
}

export const Button = ({ onClick, title, disabled }: ButtonType) => {
    return (
        <button onClick={onClick} disabled={disabled}>{title}</button>
    )
}