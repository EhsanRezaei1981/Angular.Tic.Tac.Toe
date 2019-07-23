import { Component } from "@angular/core";
import { TicTacToeService } from "./tic-tac-toe.service";

@Component({
  selector: "tic-tac-toe",
  templateUrl: "tic-tac-toe.component.html"
})
export class TicTacToeComponent {
  constructor(private TTTService: TicTacToeService) {}

  getCurrentDate() {
    return new Date();
  }
  get currentPlayerNo() {
    return this.TTTService.currentPlayerNo;
  }
  get winner() {
    return this.TTTService.winner;
  }
  get player1Score() {
    return this.TTTService.player1Score;
  }
  get isStarted() {
    return this.TTTService.isStarted;
  }
  get isRoundFinished() {
    return this.TTTService.isRoundFinished;
  }
  get player2Score() {
    return this.TTTService.player2Score;
  }
  get grid() {
    return this.TTTService.grid;
  }
  restartHandleClick() {
    this.TTTService.restart();
  }
  nextRoundHandleClick() {
    this.TTTService.nextRound();
  }
  cellHandleClick(rowIndex: number, colIndex: number) {
    this.TTTService.cellHandleClick(rowIndex, colIndex);
  }
}
