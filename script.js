const GameBoard = (function(){
    let gameBoard = [];

    const $fields = document.querySelectorAll('.field'); 


    $fields.forEach((field)=>{
        let fieldAttr = field.getAttribute('data-index');
        field.addEventListener('click',()=>{
            const $fieldEle = document.querySelector(`[data-index="${fieldAttr}"]`);
            console.log($fieldEle);
            addMarker($fieldEle);
        })
    })   
    

    function _render(field) {
        field.textContent = "X";
    }
    
    function addMarker(value) {
        _render(value);
    } 
})();
