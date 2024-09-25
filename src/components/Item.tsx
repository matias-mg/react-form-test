interface Props {
  text: string
  handleRemove: () => void
}

export const Item: React.FC<Props> = ({ text, handleRemove }) => {
  return (
    <li>
      {text}
      <button onClick={handleRemove}>X</button>
    </li>
  )
}