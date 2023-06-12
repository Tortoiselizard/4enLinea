import './Message.css'

function Message ({ gameCondition, utility }) {
  if (gameCondition.status === 'playing') return null
  return (
    <section className='alert-message'>
      <div className='alert-message-container'>
        <h2>{`${gameCondition.player.name} win!`}</h2>
        <header>{gameCondition.comment}</header>
        <footer>
          <button onClick={() => utility()}>New Game</button>
        </footer>
      </div>
    </section>
  )
}

export default Message
