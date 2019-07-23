export class TicTacToeService {
  private dim: number = 3;
  private playCount: number = 0;
  private _currentPlayerNo: number = 1;
  private _currentPlayerIndex: number = 0;
  private _winner: number;
  private _grid: any;
  private _isStarted: boolean = false;
  private _player1Score: number = 0;
  private _player2Score: number = 0;
  private _isRoundFinished: boolean = false;
  constructor() {
    this.gridGenerator();
  }
  private gridGenerator() {
    this._grid = [];
    for (let i = 0; i < this.dim; i++) {
      this._grid[i] = [];
      for (let j = 0; j < this.dim; j++) {
        this._grid[i].push(null);
      }
    }
  }

  get grid() {
    return this._grid;
  }
  get winner() {
    return this._winner;
  }
  get isStarted() {
    return this._isStarted;
  }
  get player1Score() {
    return this._player1Score;
  }
  get player2Score() {
    return this._player2Score;
  }
  get isRoundFinished() {
    return this._isRoundFinished;
  }
  get currentPlayerNo() {
    return this._currentPlayerNo;
  }
  private whoIsTheWinner(row) {
    let tmpArray = row.slice(0);
    let agg = 0;
    for (let i = 0; i < tmpArray.length; i++) {
      const value = tmpArray[i];
      if (value == null) {
        return;
      }
      agg += value;
    }
    if (agg === 0 || agg === this.dim) {
      return { winner: this._currentPlayerIndex };
    }
    return;
  }
  private checkGrid() {
    let whoIsTheWinner = this._grid.reduce((doWeHaveWinner, row) => {
      return doWeHaveWinner || this.whoIsTheWinner(row);
    }, false);
    let cols = [];
    for (let i = 0; i < this.dim; i++) {
      cols.push(this._grid.map(row => row[i]));
    }
    whoIsTheWinner =
      whoIsTheWinner ||
      cols.reduce((doWeHaveWinner, col) => {
        return doWeHaveWinner || this.whoIsTheWinner(col);
      }, false);
    let diagonals = [
      this._grid.map((row, i) => row[i]),
      this._grid.map((row, i) => row[this.dim - 1 - i])
    ];
    whoIsTheWinner =
      whoIsTheWinner ||
      diagonals.reduce((doWeHaveWinner, diagonal) => {
        return doWeHaveWinner || this.whoIsTheWinner(diagonal);
      }, false);
    if (whoIsTheWinner) {
      if (whoIsTheWinner.winner === 0) this._player1Score++;
      else if (whoIsTheWinner.winner === 1) this._player2Score++;
    }
    if ((!whoIsTheWinner && this.playCount === 9) || whoIsTheWinner)
      this._isRoundFinished = true;
    return whoIsTheWinner;
  }

  private publicReset() {
    this.gridGenerator();
    this._winner = null;
    this.playCount = 0;
    this._isStarted = false;
    this._isRoundFinished = false;
    this._currentPlayerNo = 1;
  }
  restart() {
    this.publicReset();
    this._player1Score = this._player2Score = 0;
  }

  nextRound() {
    this.publicReset();
  }

  cellHandleClick(rowIndex: number, colIndex: number) {
    this._isStarted = true;
    if (this._grid[rowIndex][colIndex] != null || this._isRoundFinished) return;

    this.playCount++;
    const selectedPlayer = (this._currentPlayerIndex =
      this.playCount % 2 ? 0 : 1);
    this._grid[rowIndex][colIndex] = selectedPlayer;

    var result = this.checkGrid();
    if (result) {
      this._winner = result.winner;
    } else if (this.playCount != 9)
      this._currentPlayerNo = this._currentPlayerNo === 1 ? 2 : 1;
  }
}
