import './Footer.css'

import { players } from '../../constants'

function Footer ({ turn }) {
  return (
    <footer className='footer-container'>
      <div id={turn.color === 'red' ? 'player-selected' : null}>
        <span>{players.player1.name}</span>
        <label className='players-color' id='player1-color' />
      </div>
      <div id={turn.color === 'yellow' ? 'player-selected' : null}>
        <span>{players.player2.name}</span>
        <label className='players-color' id='player2-color' />
      </div>
    </footer>
  )
}

export default Footer
