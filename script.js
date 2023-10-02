const gameBoard = (function(){
    let board = [];

    const setField = (index,sign)=>{
        board[index]=sign;
    }

    const getField = (index) =>{
        return board[index];
    }

    return (setField, getField);
})();

const displayController = (function(){

    const $fields = document.querySelectorAll('.field'); 

    $fields.forEach((field)=>{
        field.addEventListener('click',(e)=>{
            
        })
    })   

    const _renderGameBoard = () =>{
        for(let i = 0;i<$fields.length;i++){
            $fields[i].textContent = gameBoard.getField(i);
        }
    }
    

})();