import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className='card'>
            <div className={flipped ? 'flipped' : ''}> {/*if true assigns the 'flipped' class name*/}
                <img className="front" src={card.src} alt="card front" />
                <img
                    className="back"
                    src="/img/cover.png"
                    onClick={handleClick}
                    alt="card back" />
            </div>
        </div>
    )
}
