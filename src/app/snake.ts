import { Position } from './position';

export class Snake {
    init : Position;                                                                                                    //posizione iniziale
    length : number;                                                                                                    //lunghezza iniziale
    body = new Array();
    direction : Position;


    constructor(x : number, y : number, length: number){                                  
        this.init = new Position(x, y);
        this.length = length;
        this.direction = new Position(1, 0);                                                                            //Direzione verso dx;
        this.initialize();
    }

    //Inizializzo body
    initialize(): void{
        for(var i = 0; i < this.length ; i++){
            this.body.push(new Position(this.init.x - i,this.init.y));	
        }
    }

    //Muovo lo snake in base alla direzione   
    move(): void{
        var snakeX = this.body[0].x;																		            //Variabili temporanee di posizione
        var snakeY = this.body[0].y;
        
        var tail = this.body.pop(); 

        snakeX += this.direction.x;																			            //Sposto in base alla direzione
        snakeY += this.direction.y;

        tail.x = snakeX; 																				                //Ok, setto la nuova posizione
        tail.y = snakeY;
    
        this.body.unshift(tail);
    }

    //Aggiungo un pezzo al corpo dello snake che diventa la sua coda
    addTale() : void{
        var copia : Position = new Position(this.body[this.body.length-1].x,this.body[this.body.length-1].y);			//Copio la coda
        copia.x-= this.direction.x;																		                //Creo la nuova coda
        copia.y-= this.direction.y;
        this.body.push(copia);	
    }

    //Controllo sovrapposizione di oggetti
    checkOver(snakeX : number, snakeY : number) : boolean{
        for(var i = 1; i < this.body.length ; i++){                                                                     //Controllo collisione con il corpo
            if(snakeX == this.body[i].x && snakeY == this.body[i].y){
                return true;
            }               
        }
       return false;
    }

    //Controllo se mangio me stesso
	cannibal() : boolean{
        return this.checkOver(this.body[0].x, this.body[0].y);
    }

  }