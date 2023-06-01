// By Simon Garrad.
const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');
const light = document.querySelector('.light');
const gameOver = document.querySelector('.gameOver');
const numberRounds = document.querySelector('.box3');
const highScore = document.querySelector('.box1');
let turn=1;
//groups the buttons
const getRandomButton = () => {
    const buttons = [
        green,
        red,
        yellow,
        blue
    ]
    //this uses Math.random() to choose a random button between 1-4
    return buttons[parseInt(Math.random() * buttons.length)];
};
//creates the sequence 
const sequence = [getRandomButton()];
let sequenceToGuess = [...sequence];
//creates the flashing sequence
const flash = (button) => {
    return new Promise ((resolve, reject) => {
        button.className += ' active';
        //speeds the sequence up depending on value of 'turn'
        if (turn<=5){
            speed=1000;
        }else if((turn >5) && (turn<=9)){
            speed=500;
        }else if((turn>9) && (turn<=13)){
            speed=100;
        }else if((turn>13)){
            speed=50;
        }
        //the flashes in the sequence
        setTimeout(() => {
            button.className = button.className.replace(
                ' active',
                ''
            );
            setTimeout(() => {
                resolve();
            }, 250);
        }, speed );
    });
};
//checks the clicks are the same as the sequence
const clicked = (clicked) => {
    if (!canClick) return;
    const expectedButton = sequenceToGuess.shift();
    if (expectedButton === clicked) {
        count = +numberRounds.innerText;
        if (sequenceToGuess.length === 0) {
            numberRounds.innerHTML = count+1;
            if (count>=highScore.innerText){
                //updates the highSCore
            highScore.innerHTML = 1+count;
        }
            //start new round
            sequence.push(getRandomButton());
            sequenceToGuess = [...sequence];
            startFlashing();
            turn++;
        }
    } else {//this stops clicks from registering
            canClick = false;
            //resets the currert score box
            const numberRounds = document.querySelector('.box3'),
            count = +numberRounds.innerText;
            numberRounds.innerHTML = '00';
            //groups buttons and uses a for loop to apply .gameOver in css
            const gameOver = async (reds) => {
                const buttons = [green, red, yellow, blue];
                let count = 0;
                const flashes = () => {
                  for (let i = 0; i < buttons.length; i++) {
                    const button = buttons[i];
                    button.classList.toggle(reds);
                  }
                  count++;
                  if (count >= 10) {
                    for (let i = 0; i < buttons.length; i++) {
                      const button = buttons[i];
                      button.classList.remove(reds);
                    }
                    reset();//calls the reset funciton to reset the game (except High Score)
                  } else {
                    setTimeout(flashes, 300);//times the flashes
                  }
                };
                flashes();//flashes red
                reset();//resets the game (except High Score)
              };
              
            gameOver('gameOver');
             //changes the light from reds to green
                light.className = light.className.replace(
                    ' activeLight',
                    ''  
                );
    }
};
//this is to set it so user cant click during the sequence
const startFlashing = async () => {
    canClick = false;
    for (const button of sequence) {
        await flash(button);
    }
    canClick = true;
}
//this is to start the game with the 3 second timer
const start = (start) => {
    light.className += ' activeLight';
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
                resolve();
                startFlashing();
        }, 3000);
    });
};
//this resets the game, it overwrites the old sequence and chooses a new random starter
const reset = async () => {
    sequence.length = 0;
    turn = 0;
    sequence.push(getRandomButton());
    sequenceToGuess = [...sequence];
  };

// References:
// https://www.youtube.com/watch?v=W0MxUHlZo6U&t=1066s
// https://www.youtube.com/watch?v=PSFHCMCGEOE
// https://www.w3schools.com/jquery/eff_toggle.asp#:~:text=The%20toggle()%20method%20toggles,This%20creates%20a%20toggle%20effect.
// https://ibaslogic.com/javascript-foreach/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
// https://geekflare.com/popular-javascript-functions/
// https://www.freecodecamp.org/news/javascript-settimeout-how-to-set-a-timer-in-javascript-or-sleep-for-n-seconds/
// https://www.youtube.com/watch?v=FEL8gKaIm1Y
// https://www.youtube.com/watch?v=SSNjxpSuAgw
// https://www.freecodecamp.org/news/javascript-es6-promises-for-beginners-resolve-reject-and-chaining-explained/