interface Props {
  token: string
  logout: () => void
}


const TextSplitter: React.FC<Props> = ({token, logout}) => {
  return (
    <div>
      <h2>Text Splitters</h2>
      <h2>{token}</h2>
      <nav>
        <button onClick={logout}>Logout</button>
      </nav>
    </div>

  )
}

export default TextSplitter


const Charly = () => {
  
}