import { Position } from './position';

export class Snake {
    init : Position;                                        //posizione iniziale
    length : number;                                   //lunghezza iniziale
    body = new Array();
    direction : Position;


    constructor(x : number, y : number, length: number){                                  
        this.init = new Position(x, y);
        this.length = length;
        this.direction = new Position(1, 0);                //Direzione verso dx;
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
        var SnakeX = this.body[0].x;																		//Variabili temporanee di posizione
        var SnakeY = this.body[0].y;
        
        var tail = this.body.pop(); 

        SnakeX += this.direction.x;																			//Sposto in base alla direzione
        SnakeY += this.direction.y;

        this.checkCannibal(SnakeX, SnakeY);

        tail.x = SnakeX; 																				//Ok, setto la nuova posizione
        tail.y = SnakeY;
    
        this.body.unshift(tail);
    }

    //Aggiungo un pezzo al corpo dello snake che diventa la sua coda
    addTale() : void{
        var copia : Position = new Position(this.body[this.body.length-1].x,this.body[this.body.length-1].y);			//Copio la coda
        copia.x-= this.direction.x;																		//Creo la nuova coda
        copia.y-= this.direction.y;
        this.body.push(copia);	
    }

    //Controllo se mangio me stesso
	checkCannibal(SnakeX : number, SnakeY : number) : void{
        for(var i = 0; i < this.body.length ; i++){
            if(SnakeX == this.body[i].x && SnakeY == this.body[i].y){
                alert("cann");
                //return true;
            }
                
        }
       // return false;
    }

  }