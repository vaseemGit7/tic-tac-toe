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
            if(e.target.textContent === ""){
                gameController.playRound(parseInt(e.target.dataset.index));
                _renderGameBoard();
            }
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
        _checkWinner(index);
        _switchPlayers();
    }

    const _checkWinner = (fieldIndex) =>{
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
            console.log("Player One is the winner!");
            }
            else{
            console.log("Player Two is the winner!");    
            }
        }
    }
    return{playRound};
})();