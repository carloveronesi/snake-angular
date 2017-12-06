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

    //TODO: muovo lo snake in base alla direzione   
    move(): void{
        var SnakeX = this.body[0].x;																		//Variabili temporanee di posizione
        var SnakeY = this.body[0].y;
        
        var tail = this.body.pop(); 

        SnakeX += this.direction.x;																			//Sposto in base alla direzione
        SnakeY += this.direction.y;
        
        //TODO: Controllo

        tail.x = SnakeX; 																				//Ok, setto la nuova posizione
        tail.y = SnakeY;
    
        this.body.unshift(tail);
    }

  }