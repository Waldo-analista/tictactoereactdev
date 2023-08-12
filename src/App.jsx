import { useState } from "react";
import './App.css'
const Square=({valor,onSquareClick})=>{


  return <button className="square" onClick={onSquareClick} >{valor}</button>
}


const  Board=({ isNext, squares, onPlay,definirPosition })=> {

  const winner=calculateWinner(squares);
  let status;
  if(winner){
    status='Ganador es:'+winner;
  }
  else{
    status='Le toca al jugador: '+(isNext?'X':'O');
  
  }

  const handleClick=(i)=>{
    if(squares[i] || calculateWinner(squares)){
      return;
    }

    const newSquares=squares.slice();
    if(isNext){
      newSquares[i]='X';
    }else{
      newSquares[i]='O';
    }
    onPlay(newSquares);
      
  }

  const board=[];
  for(let i=0;i<3;i++){

    const lista=[];

    for(let j=0;j<3;j++){
      lista[j]=j+3*i;
    }
    
    board.push(<div key={i} className="board-row">
      {
      lista.map((elemento)=>{
        return <Square key={elemento} valor={squares[elemento]} onSquareClick={()=>handleClick(elemento)}/>
      })
      }
            </div>)
  }
 

  

  return  <>
            <div className="status">{status}</div>
            {board}
          </>
}

const Game=()=>{

  const [history, setHistory] = useState([Array(9).fill('')]);
  const [currentMove,setCurrentMove]=useState(0);


  
   

  const currentSquare=history[currentMove];
  let isNext=currentMove%2===0;
  
  const handlePlay=(newSquare)=>{
      const newHistory=[...history.slice(0,currentMove+1),newSquare]
      setHistory(newHistory);
      setCurrentMove(newHistory.length-1);

      isNext=!isNext;
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    isNext=(nextMove % 2 === 0);
    
  }

  const moves = history.map((squares, move,history) => {
    let description;
    if (move > 0) {
      description = `Ir al movimiento #${move}`;
      if(history[history.length-1]===squares){
        description=`Estas en el movimiento # ${move}`;
      }
    } else {
      description = 'Ir al inicio del juego (Movimiento 0)';
    }

    if(history[history.length-1]===squares){
      return (
    
        <li key={move}>
          {description}
        </li>
        
      );
    }
    else{
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
        
      );
    }
    
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board isNext={isNext} squares={currentSquare} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


const calculateWinner=(squares)=>{
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
