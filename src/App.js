import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([]) //initially cards is an empty array, hence we don't see them on refresh, we use another useEffect with shuffleCards function to display them
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffling cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] //we need two of each cards so total 12 cards
      .sort(() => Math.random() - 0.5) //generating +ve or -ve number to sort a before b which is default for -ve and other way around for +ve
      .map(card => ({ ...card, id: Math.random() })) //assigning random id to each card

    //making sure choices are set to null
    setChoiceOne(null)
    setChoiceTwo(null)

    setCards(shuffledCards)
    setTurns(0) //everytime shuffleCards() is called, it will be for a new game so the turns reset to 0
  }

  //handling choice and preventing double click bug
  const handleChoice = (card) => {
    if (choiceOne && (choiceOne.id !== card.id)) {
      setChoiceTwo(card)
    } else {
      setChoiceOne(card)
    }
  }

  //comparing two selected cards and updating 'matched' property
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true) //disables selection for some time after the 2 choices have been made
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) //we can also write choiceTwo.src instead as they both have equal values
              return { ...card, matched: true }
            else return card
          })
        })
        resetTurn()
      }
      else {
        setTimeout(() => resetTurn(), 1000) //adds delay on reset after match fail, 1000 milliseconds = 1 second, it's an inbuilt JS method
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  //resetting choices and handling turns
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //starting a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Pair Match</h1>
      <h2>Rules:</h2>
      <p>-Click to flip the cards</p>
      <p>-Find all the matching pairs</p>
      <p></p>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            //keeping a card flipped
            flipped={card === choiceOne || card === choiceTwo || card.matched} //adding flipped prop to a card during iteration, it will either be true or false
            disabled={disabled} />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App