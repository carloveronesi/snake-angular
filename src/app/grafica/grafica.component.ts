import { Component, OnInit } from '@angular/core';
import { Apple } from '../apple';
import { Snake } from '../snake';

//Costanti
const COLUMNS = 10;                                                                     //Costante lunghezza colonne
const ROWS = 10;                                                                        //Costante lunghezza righe
const SNAKE_INIT_X = 0;
const SNAKE_INIT_Y = 5;
const SNAKE_INIT_LEN = 3;
const UPDATE_INTERVAL = 300;
const WIN_SCORE = 2;
const COLOR_HEAD = "blue";
const COLOR_BODY = "green";
const COLOR_APPLE = "red";
const COLOR_EMPTY = "lightgrey";
const MESSAGE_WIN = "Vittoria!";
const MESSAGE_GAME_OVER = "game over";

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})

export class GraficaComponent implements OnInit {
  score : number = 0;
  matrix = new Array(COLUMNS);                                                          //Matrice contenente i dati di ogni singola cella
  apple : Apple = new Apple();                                                          //Mela
  snake : Snake = new Snake(SNAKE_INIT_X, SNAKE_INIT_Y, SNAKE_INIT_LEN);                //Snake
  interval;                                                                             //Intervallo aggiornamento
  stopGame : boolean = false;                                                           //mostro o no il messaggio di vittoria / game over?
  winGame : boolean = false;
  message : string = "";                                                                //Testo messaggio di vittoria / game over


  //Inizializzo la matrice ed assegno a 0
  generateMatrix() : void {
    for (var i = 0; i < COLUMNS; i++) {
      this.matrix[i] = new Array(ROWS);
      for (var j = 0; j < ROWS; j++) 
        this.matrix[i][j] = 0;
    }
  }

  //Pulisco la matrice assegnando tutti 0
  clear() : void {
    for (var i = 0; i < COLUMNS; i++) 
      for (var j = 0; j < ROWS; j++) 
        this.matrix[i][j] = 0;
  }

  //Funzione che genera una nuova apple
  generateApple() : void {
    do{
      this.apple.y = Math.floor(Math.random()*(COLUMNS-1));
      this.apple.x = Math.floor(Math.random()*(ROWS-1));
      this.drawApple();
    }while(this.snake.checkOver(this.apple.x,this.apple.y));                            //Evito che si sovrappongano snake ed apple
  }  
  
  //Disegno la mela
  drawApple(){
    this.matrix[this.apple.y][this.apple.x] = 1;
  }

  //Funzione che genera lo snake
  generateSnake() : void {                                                               
    this.matrix[SNAKE_INIT_Y][SNAKE_INIT_X] = 3;
  }

  //Funzione che ritorna il colore della cella
  color(val){                                                                            
    switch(val){
      case 1: return COLOR_APPLE;                                                       //apple
      case 2: return COLOR_BODY;                                                        //Corpo snake
      case 3: return COLOR_HEAD;                                                        //testa snake
      default: return COLOR_EMPTY;                                                      //vuoto
    }
  }

  //Controllo collisioni con il bordo del gioco
  checkCollision() : boolean{
    var x = this.snake.body[0].x;
    var y = this.snake.body[0].y;

    if(x == ROWS || y == COLUMNS || x == -1 || y == -1)                               //Bordi
      return true;
    return false;
  }

  //Controllo se lo snake ha mangiato la mela
  eatApple() : void{
    var x = this.snake.body[0].x;
    var y = this.snake.body[0].y;

    if(this.apple.x == x && this.apple.y == y){
      this.score++;
      this.generateApple();
      this.snake.addTale();
    }
  }

  //Movimento dello snake
  move(dir : string) : void {
    switch(dir){
      case "up":
        if(this.snake.direction.y != 1){
          this.snake.direction.x = 0;
          this.snake.direction.y = -1;
        }
        break;
      case "down":
        if(this.snake.direction.y != -1){
          this.snake.direction.x = 0;
          this.snake.direction.y = 1;
        }
        break;
      case "left":
        if(this.snake.direction.x != 1){
          this.snake.direction.x = -1;
          this.snake.direction.y = 0;
        }
        break;
      case "right":
        if(this.snake.direction.x != -1){
          this.snake.direction.x = 1;
          this.snake.direction.y = 0;
        }
        break;
    }
  }

  //Gestione grafica de gioco
  draw(){
    this.snake.move();                                                                  //Muovo lo snake
    this.eatApple();                                                                    //Controllo se ha mangiato la mela
    if(this.score == WIN_SCORE)                                                         //Controllo vittoria
      this.win();
    if(!this.checkCollision() && !this.snake.cannibal()){                               //Controllo se lo snake colpisce i bordi oppure mangia se stesso                                                  //Controllo collisione
      this.clear();                                                                     //Creo Matrice Vuota
      this.drawApple();                                                                 //Genero la apple
      this.updateSnake();
    }else{                                                                              //GAME OVER
      this.gameOver();
    }
  }

  //Game Over
  gameOver() : void {
    this.stopGame = true;                                                               //Faccio apparire il messaggio
    this.message = MESSAGE_GAME_OVER;                                                   //Assegno messaggio di game over
    clearInterval(this.interval);                                                       //Fermo aggiornamento
  }

  //Vittoria!
  win() : void {
    this.stopGame = true;                                                               //Faccio apparire il messaggio
    this.message = MESSAGE_WIN;                                                         //Assegno messaggio di vittoria
    this.winGame = true;
    clearInterval(this.interval);                                                       //Fermo aggiornamento
  }

  //Aggiorno il disegno dello snake
  updateSnake(): void{
    for (var i = this.snake.body.length-1; i >= 0; i--) {
      var x = this.snake.body[i].x;
      var y = this.snake.body[i].y;
      if(x >=0 && y >=0){
        if(i == 0)
          this.matrix[y][x] = 3;                                                        //Testa
        else
          this.matrix[y][x] = 2;                                                        //Corpo
      }
    }
  }

  constructor() { }

  ngOnInit() {                                                                          //Inzializzazione
    this.generateMatrix();                                                              //Inizializzo la matrice
    this.generateApple();                                                               //Genero la mela
    this.interval = setInterval(() => { this.draw() }, UPDATE_INTERVAL);                //Disegno
  }

}
