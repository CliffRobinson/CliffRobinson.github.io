function initBoard(){
    let board = document.getElementById('board');
    let size = 3;

    for (let i = 0; i<size;i++){
        for (let j = 0; j<size;j++){
            board.innerHTML += '<div class="square"></div>';
            //Square '+i+'-'+j+'
        }
    }

}

function addSquareEventListeners(){
    let squares = document.getElementsByClassName('square');
    for (let i of squares){
        i.addEventListener('click',pinkify);
    }
}

function pinkify(){
    
    event.target.classList.toggle('pink');
}

initBoard();
addSquareEventListeners();