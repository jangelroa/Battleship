import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import hit from './assets/Hit.png';
import miss from './assets/Miss.png';
import aircraft from './assets/Aircraft.png';
import battleship from './assets/Battleship.png';
import carrier from './assets/Carrier.png';
import submarine from './assets/Submarine.png';
import cruiser from './assets/Cruiser.png';

const layout = [
  { "ship": "carrier", "positions": [[2,9], [3,9], [4,9], [5,9], [6,9]] },
  { "ship": "battleship", "positions": [[5,2], [5,3], [5,4], [5,5]] },
  { "ship": "cruiser", "positions": [[8,1], [8,2], [8,3]] },
  { "ship": "submarine", "positions": [[3,0], [3,1], [3,2]] },
  { "ship": "destroyer", "positions": [[0,0], [1,0]] }
];

// Adding the 'intact' state to every position (coordinate)
const ships = layout.map(ship => {
  return { ...ship, positions: ship.positions.map(position => {
    return position.concat('intact');
  })}
});

console.log(ships)

function Square(props) {
  const { value, onClick } = props;

  if(value) {
  console.log("VALUE", value)
  }
  return (
    <button className="square" onClick={onClick}>
      {/* {value} */}
      { value === 'W' && <img className="squareImg" src={miss} alt="Miss" /> }
      { value === 'H' && <img className="squareImg" src={hit} alt="Hit" />}
      
    </button>
  );
}

class Board extends React.Component {
  state = {
    board: [
      Array(10).fill(null),
      Array(10).fill(null),
      Array(10).fill(null),
      Array(10).fill(null),
      Array(10).fill(null),
      Array(10).fill(null),
      Array(10).fill(null),
      Array(10).fill(null),
      Array(10).fill(null),
      Array(10).fill(null)
    ],
    // ships: [
    //   // report values ['intact', 'hit', 'sink']
    //   [
    //     {x: 0, y: 0, report: 'intact'},
    //     {x: 0, y: 1, report: 'intact'},
    //     {x: 0, y: 2, report: 'intact'}
    //   ],
    //   [
    //     {x: 1, y: 3, report: 'intact'},
    //     {x: 2, y: 3, report: 'intact'},
    //     {x: 3, y: 3, report: 'intact'}
    //   ]
    // ],
    ships,
    xIsNext: true
  }

  handleFire = (coorX,coorY) => {
    // // Check if Fire is Water(W), Hit(H) and if Hit -> Sink(S)? 
    let resultOfFire = 'W';

    // return the same result for coordinates already fired before.
    if (this.state.board[coorX][coorY] !== null) {
      resultOfFire = this.state.board[coorX][coorY];
    }

    // if coordinates don't belong to a any ship, hittedShip will be undefined 
    const hittedShip = this.state.ships.find(ship => {
      for (let i = 0 ; i < ship.positions.length; i++ ) {
    console.log('ship.positions[0]', ship.positions[0])

        if(ship.positions[i][0] === coorX && ship.positions[i][1] === coorY) {
          return true;
        }
      };
      return false;
    });

    console.log('hittedShip', hittedShip)

    let intactCoordinates = [];
    if (hittedShip) {
      resultOfFire = 'H'; // hit (so far)
      // if the rest of the coordinates are also 'H' set the ship as Sink 'S'
      // intactCoordinates = hittedShip.filter(coor => {
      //   return coor.report === 'intact' && (coor.x !== coorX || coor.y !== coorY);
      // });
    }

    // if (intactCoordinates.length === 0){
    //   // sthe ship sunk.
    //   resultOfFire = 'S';
    // }

    // // Update ships
    // const updateShips = this.state.ships.map(ship => {
    //   if (ship === hittedShip) {
    //     const newShip = ship.map(coor => {
    //       if(resultOfFire === 'H' && coor.x === coorX && coor.y === coorY) {
    //         return { ...coor, report: 'hit'};
    //       } else if (resultOfFire === 'S') {
    //         return { ...coor, report: 'sink'};
    //       }
    //       return coor;
    //     });
    //     return newShip;
    //   }
    //   return ship;
    // })
    

    // this.setState({
    //   board: this.state.board.map((row, x) => {
    //     return row.map((square, y) => {
    //       if(coorX === x && coorY === y) {
    //         console.log('square x, y', square, x, y)
    //         return resultOfFire;
    //       }
    //       return square;
    //     });
    //   }),
    //   ships: updateShips
    // })

    // const resultOfFire = 'H'
    this.setState({
      board: this.state.board.map((row, x) => {
        return row.map((square, y) => {
          if(coorX === x && coorY === y) {
            return resultOfFire;
          }
          return square;
        });
      }),
      // ships: updateShips
    })
  }

  renderSquare(x, y) {
    // console.log(`x,y = ${x},${y}`);
    return (
      <Square
        key={`${x},${y}`}
        value={this.state.board[x][y]} 
        onClick={() => this.handleFire(x,y)}
        />
    );
  }

  render() {
    return (
      <div>
        {/* Build the board on the DOM */}
        {this.state.board.map((row, x) => {
          return (
            <div key={x} className="board-row">
              {row.map((square, y) => {
                return this.renderSquare(x,y);
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-info">
          <div className="scores">
            <div className="player1">
              <div><h1>00</h1></div>
              <div><h4>player 1</h4></div>
            </div>
            <div className="player2">
              <div><h1>00</h1></div>
              <div><h4>player 2</h4></div>
            </div>
          </div>
          <div>
            <div>
              <img className="ship" src={aircraft} alt="aircraft" />
            </div>
            <div>
              <img className="ship" src={battleship} alt="battleship" />
            </div>
            <div>
              <img className="ship" src={cruiser} alt="cruiser" />
            </div>
            <div>
              <img className="ship" src={submarine} alt="submarine" />
            </div>
            <div>
              <img className="ship" src={carrier} alt="carrier" />
            </div>
          </div>
          
        </div>
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root'),
);
