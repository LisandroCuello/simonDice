const btnStart = document.getElementById('btnStart');

const green = document.getElementById('green');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const blue = document.getElementById('blue');

const finalLevel = 8;

class game{

	constructor(){
		this.begin = this.begin.bind(this);
		this.begin();
		this.sequence();
		setTimeout(this.nextLevel, 500);
	}

	begin(){
		this.selectedColor = this.selectedColor.bind(this);
		this.nextLevel = this.nextLevel.bind(this);
		this.methodBtnStart();

		this.level = 1;
		this.colors = {
			green: green, red, yellow, blue
		};
	}

	methodBtnStart(){
		if(btnStart.classList.contains('hide')){
			btnStart.classList.remove('hide')
		} else{
			btnStart.classList.add('hide')
		}
	}

	sequence(){
		this.sequence = new Array(finalLevel).fill(0).map(x => Math.floor(Math.random() * 4));
	}

	nextLevel(){
		this.previouslevel = 0;
		this.sequenceActivate();
		this.addEvent();
	}

	numberToColor(number){
		switch(number){
			case 0:
				return 'green'
			case 1:
				return 'red'
			case 2:
				return 'yellow'
			case 3:
				return 'blue'
		}
	}

	colorToNumber(number){
		switch(number){
			case 'green':
				return 0
			case 'red':
				return 1
			case 'yellow':
				return 2
			case 'blue':
				return 3
		}

	}

	sequenceActivate(){
		for(let i = 0; i< this.level; i++){
			const color = this.numberToColor(this.sequence[i]);

			setTimeout(()=> {
				this.colorAction(color)
			}, 1000 * i);
		};
	}

	colorAction(color){
		this.colors[color].classList.add('light');
		setTimeout(()=> this.removeColor(color), 350);
		console.log(this.colors[color])
	}

	removeColor(color){
		this.colors[color].classList.remove('light');
	}

	addEvent(){



		this.colors.green.addEventListener('click', this.selectedColor);
		this.colors.red.addEventListener('click', this.selectedColor);
		this.colors.yellow.addEventListener('click', this.selectedColor);
		this.colors.blue.addEventListener('click', this.selectedColor);
	}

	removeEvent(){
		this.colors.green.removeEventListener('click', this.selectedColor);
		this.colors.red.removeEventListener('click', this.selectedColor);
		this.colors.yellow.removeEventListener('click', this.selectedColor);
		this.colors.blue.removeEventListener('click', this.selectedColor);
	}

	selectedColor(ev){
		const colorName = ev.target.dataset.color;
		const colorNumber = this.colorToNumber(colorName);
		this.colorAction(colorName);

		if(colorNumber === this.sequence[this.previouslevel]){
			this.previouslevel++;

			if(this.previouslevel === this.level){
				this.level++;
				this.removeEvent();

				if(this.level === (finalLevel + 1)){
					this.gameWon();

					}else{
					setTimeout(this.nextLevel, 1500)
				}
			}
		}else{
			this.gameOver();
		}
	}

	gameWon(){
		swal("Ganaste, felicitaciones!!!").then(this.begin)
	}

	gameOver(){
		swal("Has Perdido :(").then(()=>{

										this.removeEvent();
										this.begin();
		})
	}
}


function startGame(){
	window.game = new game();
} 