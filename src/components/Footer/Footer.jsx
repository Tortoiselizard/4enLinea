import './Footer.css'

import { players } from '../../constants'

function Footer ({ turn }) {
  return (
    <footer className='footer-container'>
      <div id={turn.color === 'r' ? 'player-selected' : null}>
        <span>{players.player1.name}</span>
        <label className='players-color' id='player1-color' />
      </div>
      <div id={turn.color === 'y' ? 'player-selected' : null}>
        <span>{players.player2.name}</span>
        <label className='players-color' id='player2-color' />
      </div>
    </footer>
  )
}

export default Footer
