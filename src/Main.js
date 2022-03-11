import React from "react"
import Die from "./Die"
import Confetti from 'react-confetti'
import {nanoid} from "nanoid"

export default function Main(){
    const [ dice, setDice] = React.useState(createNumber())
    const [tenzies, setTenzies] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [timePlayed, setTimePlayed] = React.useState(0.1)
    function createNumber(){
        let numArray = []
        for(let i = 0; i < 15; i++){
            numArray.push(generateNewNumber())
        }
        return numArray
    }
    function generateNewNumber(){
        return(
            {id: nanoid(), value: Math.ceil(Math.random() * 6), isHeld: false}
        )
    }
    function holdDice(id){
        setDice(prevDice => prevDice.map(die =>{
            return die.id === id ? {...die, isHeld: !die.isHeld}: die
        }))
    }
    function rollDice(){
       if(!tenzies){
        setDice(prevDice => prevDice.map(die => {
            return die.isHeld ? die : generateNewNumber()
        }))
        setCount(prevCount => prevCount += 1)
       }else{
           setTenzies(false)
           setDice(createNumber())
           setCount(0)
           setTimePlayed(0.1)
       }
    }
    const diceElements = dice.map(die => <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld} 
        onClick={() => holdDice(die.id)}
        />)
    React.useEffect(() => {
        const firstValue = dice[0].value
        const allValues = dice.every(die => die.value === firstValue)
        const allStates = dice.every(die => die.isHeld === true)
        if(allStates && allValues){
            setTenzies(true)
        }
    }, [dice])
    React.useEffect(() => {
        let interval = null;
        if (tenzies === false) {
          interval = setInterval(() => {
            setTimePlayed(time => time + 0.1);
          }, 100);
        } 
        return () => clearInterval(interval);
      }, [tenzies, timePlayed])
      let timer = timePlayed.toFixed(2)
    return (
        <main>
            {tenzies && <Confetti />}
            <h2>Tenzies Game</h2>
            <p>Select all Number Values until all the boxes have the same number</p>
            <div className="dice-class">
                {diceElements}
            </div>
            <button className="dice-roll" onClick={rollDice}>{tenzies? "New Game" : "Roll Dice"}</button>
            {tenzies && <h3>You rolled {count} times and your time is {timer}s</h3>}
        </main>
    )
}