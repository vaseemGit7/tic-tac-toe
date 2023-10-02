const Player = (name,sign) =>{
    this.name = name;
    this.sign = sign;

    const getSign = () =>{
        return sign;
    }
    return {getSign};
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

    return {setField, getField};
})();

const displayController = (function(){

    const $fields = document.querySelectorAll('.field'); 

    $fields.forEach((field)=>{
        field.addEventListener('click',(e)=>{
            gameController.playRound(parseInt(e.target.dataset.index));
            _renderGameBoard();
        })
    })   

    const _renderGameBoard = () =>{
        for(let i = 0;i<$fields.length;i++){
            $fields[i].textContent = gameBoard.getField(i); 
        }
    }
    
})();

const gameController =(function(){
    const playerOne = Player("PlayerOne","X");
    const playerTwo = Player("PlayerTwo","O");

    let currentPlayer = playerOne;

    const _switchPlayers = () =>{
        currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
    }

    const playRound = (index) =>{
        gameBoard.setField(index,currentPlayer.getSign());
        _switchPlayers();
    }

    return{playRound};
})();