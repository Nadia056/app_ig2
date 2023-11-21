import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Echo from 'laravel-echo';
import { catchError, throwError } from 'rxjs';
import { echo } from 'src/app/enviroments/echo';
import { TicService } from 'src/app/services/TIC/tic.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  currentPlayer: string = 'X';
  gameEnded: boolean = false;

  winningCombinations: number[][] = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
  ];

  constructor(private ticTacToeService: TicService, private changeDetectorRef: ChangeDetectorRef, private router:Router) {

  }
  playerId: any;


  ngOnInit() {
    this.subscribeToBoardUpdates();
    this.checkGameStatus();
    this.ticTacToeService.getID().subscribe((data: any) => {
      console.log(data);
      localStorage.setItem('id', data);
    }
    );


  }
  subscribeToBoardUpdates(): void {
    echo.channel('channel-game').listen('TICEvent', (data: any) => {
      console.log('Received WebSocket message');

      const dat = JSON.parse(data.message).data;

      console.log(data);

      this.playerId = dat.player;
      console.log(this.playerId, 'vamos a ver');
      this.message = ''

      const boardCopy = dat.data.map((row: any) => row.map((cell: any) => (cell !== null ? cell : '')));
      this.board = boardCopy;
      this.checkGameStatus();
      this.gameEnded=false;
      this.changeDetectorRef.detectChanges();
    }
    );
  }
  playerX: any;

  makeMove(row: number, column: number) {
    if (!this.gameEnded && this.boardIsEmpty() && this.board[row][column] === '') {
      const cellValue = 'X'
      this.playerX = localStorage.getItem('id');
      this.board[row][column] = cellValue;
      const data = {
        board: this.board,
        player: localStorage.getItem('id'),
      };
      this.ticTacToeService.boardMoves(data).subscribe((data: any) => {
        // Realiza las acciones necesarias con la respuesta del servicio
      });
      this.checkGameStatus();
    }
    else {
      if (!this.gameEnded && this.board[row][column] === '') {
        const cellValue = this.playerX === localStorage.getItem('id') ? 'X' : 'O';
        this.board[row][column] = cellValue;

        const data = {
          board: this.board,
          player: localStorage.getItem('id'),
          row: row,
          column: column
        };

        this.ticTacToeService.boardMoves(data).subscribe((data: any) => {
          // Realiza las acciones necesarias con la respuesta del servicio
        });

        this.checkGameStatus();
      }

    }

  }
  boardIsEmpty() {
    for (let row of this.board) {
      for (let cell of row) {
        if (cell !== '') {
          return false;
        }
      }
    }
    return true;



  }

message!:string;

  checkGameStatus() {
    for (let combination of this.winningCombinations) {
      const [a, b, c] = combination;
      if (
        this.board[Math.floor(a / 3)][a % 3] === this.board[Math.floor(b / 3)][b % 3] &&
        this.board[Math.floor(a / 3)][a % 3] === this.board[Math.floor(c / 3)][c % 3] &&
        this.board[Math.floor(a / 3)][a % 3] !== ''
      ) {
        this.gameEnded = true;
        console.log('Player ' + this.board[Math.floor(a / 3)][a % 3] + ' wins!');
        this.message=('Player ' + this.board[Math.floor(a / 3)][a % 3] + ' wins!');
        return;
      }
    }
    if (this.isBoardFull()) {
      this.gameEnded = true;
      this.message=('The game ended in a draw');
      console.log('The game ended in a draw');
    }
  }


  isBoardFull() {
    for (let row of this.board) {
      for (let cell of row) {
        if (cell === '') {
          return false;
        }
      }
    }
    return true;
  }

  restart()
  {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    const data = {
      board: this.board,
    };
    this.message='';
    this.ticTacToeService.boardMoves(data).subscribe((data: any) => {
      // Realiza las acciones necesarias con la respuesta del servicio
    });
    

  }
  logout()
  {
    this.ticTacToeService.logout();
    localStorage.clear();
    this.router.navigate(['/login']);
    

  }
 
}
