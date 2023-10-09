const Player = (name,sign) =>{
    this.name = name;
    this.sign = sign;

    const getName = () =>{
        return name;
    }

    const getSign = () =>{
        return sign;
    }

    const setName = (newName) =>{
        name = newName;
    }
    
    return {getName, getSign, setName};
}

const gameBoard = (function(){
    let board = [];

    const setField = (index,sign)=>{
        board[index]=sign;
    }

    const getField = (index) =>{
        return board[index];
    }

    const reset = () =>{
        for(let i=0;i<board.length;i++){
            board[i] = "";
        }
    }

    return {setField, getField, reset};
})();

const displayController = (function(){

    const $introContainer = document.querySelector('.intro-container');
    const $gameContainer = document.querySelector('.game-container');

    const $playerOneInput = document.querySelector('#playerOneInput');
    const $playerTwoInput = document.querySelector('#playerTwoInput');
    const $inputs = document.querySelectorAll('input');
    const $startBtn = document.querySelector('#startBtn');

    const $fields = document.querySelectorAll('.field'); 
    const $turnDisplay = document.querySelector('#turnDisplay');

    const $playerOneStats = document.querySelector('#playerOneStats');
    const $playerOneName = $playerOneStats.querySelector('#playerOneName');
    const $playerOneScore = $playerOneStats.querySelector('#playerOneScore');

    const $drawScore = document.querySelector('#drawScore');

    const $playerTwoStats = document.querySelector('#playerTwoStats');
    const $playerTwoName = $playerTwoStats.querySelector('#playerTwoName');
    const $playerTwoScore = $playerTwoStats.querySelector('#playerTwoScore');

    const $endgameDialogModal = document.querySelector('#endgameDialogModal');
    const $winnerAnnouncement = document.querySelector('#winnerAnnouncement');
    const $playAgainBtn = document.querySelector('#playAgainBtn');
    
    $inputs.forEach((input)=>{
        input.addEventListener('input',()=>{
            input.style.width = input.value.length+3+"ch";
        })
    })

    $startBtn.addEventListener('click',()=>{
        setTimeout(()=>{
            $introContainer.classList.add('screen-disabled');
            $gameContainer.classList.remove('screen-disabled');
            _updatePlayerInput();
            _displayCurrentPlayer();
            _displayGameStats();
        },300)
    }) 

    $playAgainBtn.addEventListener('click',(e)=>{
        setTimeout(()=>{
            e.preventDefault();
            $endgameDialogModal.close();
            _displayGameStats();
        },300)
    })

    $fields.forEach((field)=>{
        field.addEventListener('click',(e)=>{
            if(e.target.textContent === ""){
                gameController.playRound(parseInt(e.target.dataset.index));
                _displayEndGame();
                _displayCurrentPlayer();
                _displayGameStats();
                _renderGameBoard(); 
            }
        })
    }) 
    
    const _updatePlayerInput = () =>{
        gameController.updatePlayerName(getPlayerOneInput(),"playerOne");
        gameController.updatePlayerName(getPlayerTwoInput(),"playerTwo");
    }

    const getPlayerOneInput = () =>{
        return ($playerOneInput.value === "") ? "Player One" : $playerOneInput.value;
    }

    const getPlayerTwoInput = () =>{
        return ($playerTwoInput.value === "") ? "Player Two" : $playerTwoInput.value;
    }

    const _displayCurrentPlayer = () =>{
        $turnDisplay.textContent=gameController.getCurrentPlayerName()+"'s turn";
        if(gameController.getCurrentPlayerName()===getPlayerOneInput()){
            $turnDisplay.classList.add('turn-display-p-one');
            $turnDisplay.classList.remove('turn-display-p-two');
        }
        else if(gameController.getCurrentPlayerName()===getPlayerTwoInput()){
            $turnDisplay.classList.add('turn-display-p-two');
            $turnDisplay.classList.remove('turn-display-p-one');
        }
    }

    const _displayGameStats = () =>{
        $playerOneName.textContent = getPlayerOneInput();
        $playerTwoName.textContent = getPlayerTwoInput();

        $playerOneScore.textContent = gameController.getPlayerOneScore();
        $drawScore.textContent = gameController.getDrawScore();
        $playerTwoScore.textContent = gameController.getPlayerTwoScore();
    }
    
    const _displayEndGame = () =>{
        if(gameController.getIsOver()==true){
            $endgameDialogModal.showModal();
            $winnerAnnouncement.textContent = gameController.getWinner() + " is the Winner!! " ;
            gameController.gameReset();
        }
    }

    const _renderGameBoard = () =>{
        for(let i = 0;i<$fields.length;i++){
            $fields[i].textContent = gameBoard.getField(i); 
        }
    }

    return{getPlayerOneInput,getPlayerTwoInput};
})();

const gameController =(function(){
    const playerOne = Player(displayController.getPlayerOneInput(),"X");
    const playerTwo = Player(displayController.getPlayerTwoInput(),"O");

    let playerOneWins = 0;
    let playerTwoWins = 0;
    let drawCount = 0;
    let roundWinner = "";
    let winner = "";
    let isOver = false;

    let moves = 0;
    let currentPlayer = playerOne;

    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    const updatePlayerName = (name, player) => {
        if (player === "playerOne") {
            playerOne.setName(name);
        } 
        else if (player === "playerTwo") {
            playerTwo.setName(name);
        }
    }  
    
    
    const _checkRoundWinner = (fieldIndex) =>{
        let checkConditions = winConditions.filter((condition)=>
            condition.includes(fieldIndex))
            .some((possible)=>possible.every((index)=>gameBoard.getField(index)===currentPlayer.getSign())
        );

        if(checkConditions === true){
            if(currentPlayer.getSign()==="X"){
            playerOneWins++;
            roundWinner = "playerOne";
            }
            else{
            playerTwoWins++;  
            roundWinner = "playerTwo";
            }
            _roundReset();
        }
        return checkConditions;
    }

    const _isDraw = () =>{
        if(_checkRoundWinner()===false && moves === 9){
            drawCount++;
            _roundReset();
        }    
    }

    const _determineWinner = () =>{
        if(getPlayerOneScore()===3){
            winner = playerOne.getName();
            isOver = true;
        } 
        if(getPlayerTwoScore()===3){
            winner = playerTwo.getName();
            isOver = true;
        } 
    }

    const playRound = (index) =>{
        moves++;
        gameBoard.setField(index,currentPlayer.getSign());
        _checkRoundWinner(index);
        _isDraw();
        _determineWinner();
        _switchPlayers();
    }

    const _switchPlayers = () =>{
        currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
    }

    const getCurrentPlayerName = () =>{
        return currentPlayer.getName();
    }

    const getPlayerOneScore = () =>{
        return playerOneWins;
    }

    const getPlayerTwoScore = () =>{
        return playerTwoWins;
    }

    const getDrawScore = () =>{
        return drawCount;
    }

    const getWinner = () =>{
        return winner;
    }
    
    const getIsOver = () =>{
        return isOver; 
    }
        
    const _roundReset = () =>{
        gameBoard.reset();
        roundWinner = "";
        moves = 0; 
    }

    const gameReset = () =>{
        _roundReset();
        playerOneWins = 0;
        playerTwoWins = 0;
        drawCount = 0;
        winner = "";
        isOver = false;
        currentPlayer = playerOne;
    }

    return{
        playRound, 
        updatePlayerName, 
        getCurrentPlayerName, 
        getPlayerOneScore, 
        getPlayerTwoScore, 
        getDrawScore, 
        getIsOver, 
        getWinner, 
        gameReset
    };
})();