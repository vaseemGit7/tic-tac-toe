const Player = (name,sign) =>{
    this.name = name;
    this.sign = sign;

    const getName = () =>{
        return name;
    }

    const getSign = () =>{
        return sign;
    }
    return {getName, getSign};
}

const gameBoard = (function(){
    let board = [];

    const setField = (index,sign)=>{
        board[index]=sign;
        console.log(index + " = " +sign)
        console.log(board);
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

    const $fields = document.querySelectorAll('.field'); 
    const $turnDisplay = document.querySelector('#turnDisplay');

    const $playerOneStats = document.querySelector('#playerOneStats');
    const $playerOneName = $playerOneStats.querySelector('#playerOneName');
    const $playerOneScore = $playerOneStats.querySelector('#playerOneScore');

    const $drawScore = document.querySelector('#drawScore');

    const $playerTwoStats = document.querySelector('#playerTwoStats');
    const $playerTwoName = $playerTwoStats.querySelector('#playerTwoName');
    const $playerTwoScore = $playerTwoStats.querySelector('#playerTwoScore');

    const $showModal = document.querySelector('.showModal');
    const $endgameDialogModal = document.querySelector('#endgameDialogModal');
    
    $showModal.addEventListener('click',(e)=>{
        e.preventDefault();
        $endgameDialogModal.showModal();
    })

    window.onload = () =>{
        _displayCurrentPlayer();
        _displayGameStats();
    }

    $fields.forEach((field)=>{
        field.addEventListener('click',(e)=>{
            if(e.target.textContent === ""){
                gameController.playRound(parseInt(e.target.dataset.index));
                _displayCurrentPlayer();
                _displayGameStats();
                _renderGameBoard();
            }
        })
    })   

    const _displayCurrentPlayer = () =>{
        $turnDisplay.textContent=gameController.getCurrentPlayerName()+"'s turn";
    }

    const _displayGameStats = () =>{
        $playerOneName.textContent = "PlayerOne";
        $playerTwoName.textContent = "PlayerTwo";

        $playerOneScore.textContent = gameController.getPlayerOneScore();
        $drawScore.textContent = gameController.getDrawScore();
        $playerTwoScore.textContent = gameController.getPlayerTwoScore();
    }

    const _renderGameBoard = () =>{
        for(let i = 0;i<$fields.length;i++){
            $fields[i].textContent = gameBoard.getField(i); 
        }
    }
    
})();

const gameController =(function(){
    const playerOne = Player("PlayerOne","X");
    const playerTwo = Player("PlayerTwo","O");

    let playerOneWins = 0;
    let playerTwoWins = 0;
    let drawCount = 0;
    let roundWinner = "";
    let winner = "";
    let isOver = false;

    let moves = 0;

    let currentPlayer = playerOne;

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

    const playRound = (index) =>{
        moves++;
        gameBoard.setField(index,currentPlayer.getSign());
        _checkRoundWinner(index);
        _isDraw();
        _determineWinner();
        _switchPlayers();
    }

    const _checkRoundWinner = (fieldIndex) =>{
        const winConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        let checkConditions = winConditions.filter((condition)=>
            condition.includes(fieldIndex))
            .some((possible)=>possible.every((index)=>gameBoard.getField(index)===currentPlayer.getSign())
        );

        if(checkConditions === true){
            if(currentPlayer.getSign()==="X"){
            playerOneWins++;
            roundWinner = "playerOne";
            console.log("Player One is the round winner");
            }
            else{
            playerTwoWins++;  
            roundWinner = "playerTwo";
            console.log("Player Two is the round winner"); 
            }
            _gamereset();
        }
        return checkConditions;
    }

    const _isDraw = () =>{
        if(_checkRoundWinner()===false && moves === 9){
            console.log("it is a draw");
            drawCount++;
            _gamereset();
        }    
    }

    const _determineWinner = () =>{
        if(getPlayerOneScore()===3){
            winner = "Player One";
            isOver = true;
        } 
        if(getPlayerTwoScore()===3){
            winner = "Player Two";
            isOver = true;
        } 
    }

    const gameOver = () =>{
        const getWinner = () =>{
            return winner;
        }

        const getIsOver = () =>{
            return isOver; 
        }
    }

    const _gamereset = () =>{
        gameBoard.reset();
        roundWinner = "";
        moves = 0; 
    }

    return{playRound, getCurrentPlayerName, getPlayerOneScore, getPlayerTwoScore, getDrawScore};
})();