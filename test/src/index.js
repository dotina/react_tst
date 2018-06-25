import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import _ from 'lodash'

function Square(props) {
    return (
      <button className = 'square' onClick = {props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value = {this.props.squares[i]}
        onClick = {() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let row = [];
    let col = [];
    let squareNumber = 0;

    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        col.push(this.renderSquare(squareNumber));
        squareNumber++;

      }
      row.push(<div className = "board-row">{col}</div>);
      col= [];

    }

    return (
      <div>
        {row}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  findGrid(i) {
    let x = 0;
    let y = 0;

    const j = i;

    if (j === 0 || j === 1 || j === 2) {
      y = 1;
    } else if (j === 3 || j === 4 || j === 5) {
      y = 2;
    } else {
      y = 3;
    }

    if (i === 0 || i === 3 || i === 6) {
      x = 1;
    } else if (i === 1 || i === 4 || i === 7) {
      x = 2;
    } else {
      x = 3;
    }

    return y + " by " + x;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if(calculateWinner(squares) || squares[i]) {
      return;
    }

    // let gridCrd = ;

    squares[i] = this.state.xIsNext ? 'X': 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      squareNumb: i,
      gridCord: this.findGrid(i),
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step, i) {
    this.setState({
      stepNumber: step,
      squareNumb: i,
      grid: this.findGrid(step),
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const gridCord = this.state.gridCord;
    const grid = this.state.grid;

    const moves = history.map((step, move) => {
      // this.setState(grid: findGrid(this.state.squareNumb));

      const desc = move ?
        'Go to move ' + grid + " move " + move + " gridCord " + gridCord:
        'Go to game start';
        return (
          <li key = {move}>
            <button onClick = {() => this.jumpTo(move, this.state.squareNumb)} > {desc} </button>
          </li>
        );
    });

    let status;
    if (winner) {
      status = 'Winner is Player ' + winner;
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className = "header">
        <h1>XnO Game by {fullName(name)}</h1>
        <h2>It is {tick()}.</h2>
        <div className = "game">
          <div className = "game-info">
            <div>{status}</div>
            <ol>{}</ol>
          </div>
          <div className = "game-board">
            <Board
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)}
            />
          </div>
          <ol> {moves} </ol>
        </div>
      </div>
    );

    done();
  }
}

function tick(){
  return new Date().toLocaleTimeString();
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for(let i = 0; i < lines.length; i++){
    const [a,b,c] = lines[i];

    if (squares[a] && _.isEqual(squares[a], squares[b]) && _.isEqual(squares[a], squares[c])){
      return squares[a];
    }
  }

  return null;
}

function fullName(names){
  if (_.isEmpty(names)){
    return "stranger";
  }

  return `${names.firstName} .${names.middleName.charAt(0)} ${names.surName}`;

}


// const title = response.potentiallyMaliciousInput;

const name = {
  firstName: "Derrick",
  middleName: "Dickens",
  surName: "Otina"
}

function OldClock(props){
  return(
    <div>
      <h2>Time is also {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state = {date: new Date(),
                  isToggleOn: true};

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval ( () => this.tick(), 1000 );
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    if (this.state.isToggleOn){
      this.setState({
        date: new Date()
      });
    }
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <div>
        <h2>Time is also {this.state.date.toLocaleTimeString()}.</h2>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'Freeze' : 'Continue'}
        </button>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
      <Game />
    </div>
  );
}

function ListItems(props) {
  return(
    <li>{props.id} Squared = {props.value * props.value}</li>
  );
}

class NameForm extends React.Component   {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted; ' + this.state.value);
    name.firstName = this.state.value;
    event .preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
    }

    handleLoginClick() {
      this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }

    render() {
      const isLoggedIn = this.state.isLoggedIn;

      const button = isLoggedIn ? (
        <LogoutButton onClick = {this.handleLogoutClick} />
      ) : (
        <LoginButton onClick = {this.handleLoginClick} />
      );

      return (
        <div>
          {button}
        </div>
      )
    }
}

function LoginButton(props) {
  const numbers = [1,2,3,4,5];
  const listItems = numbers.map((number) =>
    <ListItems key = {number.toString()}
                id = {number.toString()}
                value = {number} />
  );

  return(
    <div>
      <button onClick = {props.onClick}>
        Login
      </button>
      <ul>{listItems}</ul>

      Bellow is the Inline Implementation
      <ul>
        {numbers.map((number) =>
          <ListItems key = {number.toString()}
                      id = {number.toString()}
                      value = {number} />
        )}
      </ul>
    </div>
  );
}

function LogoutButton(props) {
  return(
    <div>
      <button onClick = {props.onClick}>
        Logout
      </button>
      <App />
      <NameForm />
    </div>
  );
}

function done(){
    ReactDOM.render (
    <LoginControl />,
    document.getElementById('root')
  );
}

setInterval(done, 1000);
