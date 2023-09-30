const GameBoard = (function(){
    let gameBoard = [];

    const $input = document.querySelector('.input');
    const $addButton = document.querySelector('#addButton');
    const $display = document.querySelector('#display');  

    $addButton.addEventListener('click', addMarker);

    function _render() {
        $input.value="";
        $display.textContent ="";
        for(let i = 0;i<gameBoard.length;i++){
            $display.textContent += gameBoard[i];
        }
    }
    
    function addMarker() {
        gameBoard.push($input.value);
        _render();
    } 
})();
