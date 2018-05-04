function initBoard(){
    let board = document.getElementById('board');
    let size = 3;

    let p1name = 'Cliff';
    let p2name = 'Kytheon Iora';

    for (let i = 0; i<size;i++){
        for (let j = 0; j<size;j++){
            board.innerHTML += '<div class="square"></div>';
            //Square '+i+'-'+j+'
        }
    }

    document.getElementById('p1').innerHTML = "Player 1: "+p1name+",<br>You're playing Os."
    document.getElementById('p2').innerHTML = "Player 2: "+p2name+",<br>You're playing Xs."

}

function addSquareEventListeners(){
    let squares = document.getElementsByClassName('square');
    for (let i of squares){
        i.addEventListener('click',fillSquare);
    }
}

function pinkify(){
    
    event.target.classList.toggle('pink');
}

function fillSquare(){
    if (noughtPlayerActive){
        event.target.classList.add('nought');
        noughtPlayerActive = false;
    } else {
        event.target.classList.add('cross');
        noughtPlayerActive = true;
    }
    event.target.removeEventListener('click',fillSquare);
}

var noughtPlayerActive = true;
initBoard();
addSquareEventListeners();