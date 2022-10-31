import React, {useState, useEffect, useRef} from "react";
import "./style.css"

function App() {
  const [tile, setTile] = useState(["", "", "", "", "", "", "", "", ""])
  const [turn, setTurn] = useState(0)
  const [checkWin, setWin] = useState(false)
  function tileSelected(event, index) {
    if (tile[index] !== "" || checkWin) return
    const char = (turn %  2=== 0) ? 'O' : 'X'
    setTurn(prevTurn => {return prevTurn + 1})
    event.target.innerHTML = char
    let temp = tile
    temp[index] = char
    setTile(temp)
    event.target.classList.add(char)
  }
  useEffect(() => {
    var char = (turn % 2 !== 0) ? 'O' : 'X'
    setWin(() => {
      let win = false
      for (let row = 0; row < 3; row++) {
        if (tile[row] === char && tile[row + 3] === char && tile[row + 6] === char) {
          win = true
          break
        }
      }
      for (let col = 0; col < 3; col++) {
        if (tile[3 * col] === char && tile[3 * col + 1] === char && tile[3 * col + 2] === char) {
          win = true
          break
        }
      }
      if ((tile[0] === char && tile[4] === char && tile[8] === char) || 
      (tile[2] === char && tile[4] === char && tile[6] === char)) {
        win = true
      }
      if (win) return true
      else return false
    })
    console.log(tile)
  },  [tile, turn])
  function Result() {
    if (turn === 9 && !checkWin) return <h1>Its a tie!</h1>
    else if (checkWin) {
      var winner = (turn % 2 !== 0) ? 'Player 1' : 'Player  2'
      return <h1>{winner} Wins!</h1>
    }
  }
  const boardElement = useRef(null)
  function restart() {
    setTile(["", "", "", "", "", "", "", "", ""])
    setWin(false)
    setTurn(0)
    console.log(boardElement.current.children[0].className)
    for (let i = 0; i < boardElement.current.children.length; i++) {
      boardElement.current.children[i].className = "tile"
      boardElement.current.children[i].innerHTML = ""
    }
  }
  function Restart() {
    if (checkWin || turn === 9) return <button className = "restart" onClick={restart}>restart</button>
  }
  return (
    <>
      <Result/>
      <div className = "board" ref = {boardElement}>
        <button className = "tile" onClick={event => tileSelected(event, 0)}></button>
        <button className = "tile" onClick={event => tileSelected(event, 1)}></button>
        <button className = "tile" onClick={event => tileSelected(event, 2)}></button>
        <button className = "tile" onClick={event => tileSelected(event, 3)}></button>
        <button className = "tile" onClick={event => tileSelected(event, 4)}></button>
        <button className = "tile" onClick={event => tileSelected(event, 5)}></button>
        <button className = "tile" onClick={event => tileSelected(event, 6)}></button>
        <button className = "tile" onClick={event => tileSelected(event, 7)}></button>
        <button className = "tile" onClick={event => tileSelected(event, 8)}></button>
      </div>
      <Restart></Restart>
    </>
  );
}

export default App;
