function initBoard(){
    let board = document.getElementById('board');
    

    let p1name = 'Cliff';
    let p2name = 'Kytheon Iora';

    for (let i = 0; i<size;i++){
        for (let j = 0; j<size;j++){
            board.innerHTML += '<div class="square" id="'+i+'-'+j+'"></div>';
            //Square '+i+'-'+j+'
        }
    }

    document.getElementById('p1').innerHTML = "Player 1: "+p1name+",<br>You're playing Os.<br>It's your turn.";
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
        document.getElementById('p2').innerHTML += "<br>It's your turn.";
        document.getElementById('p1').innerHTML = document.getElementById('p1').innerHTML.replace("<br>It's your turn.","");
    } else {
        event.target.classList.add('cross');
        document.getElementById('p1').innerHTML += "<br>It's your turn.";
        document.getElementById('p2').innerHTML = document.getElementById('p2').innerHTML.replace("<br>It's your turn.","");
        
    }
    event.target.removeEventListener('click',fillSquare);
    checkForWin();
    switchActivePlayer();
    
    
}

function switchActivePlayer(){
    noughtPlayerActive = !noughtPlayerActive;
    document.getElementById('p1').classList.toggle('active');
    document.getElementById('p2').classList.toggle('active');
}

function checkForWin(){
    let activeSymbol = '';

    if (noughtPlayerActive){
        activeSymbol = 'nought';
    } else {
        activeSymbol = 'cross';
    }

    checkRowWin(activeSymbol);
    checkDiagonalWin(activeSymbol);
}

function checkRowWin(activeSymbol) {
    let rowChecker = true;
    let columnChecker = true
    
    for (let i = 0; i <size; i++){
        rowChecker = true;
        columnChecker = true;
        
        for (let j = 0; j<size;j++){
            
            //console.log("Checking: "+i+'-'+j);
            if (document.getElementById(i+'-'+j).classList.contains(activeSymbol) == false){
                rowChecker = false;
            }

            if (document.getElementById(j+'-'+i).classList.contains(activeSymbol) == false){
                columnChecker = false;
            }
        }

        if (rowChecker || columnChecker) {
            alert("You Wins!");
            
        }
    }
}

function checkDiagonalWin(activeSymbol){
    let inverse = size-1;
    let downChecker = true;
    let upChecker = true;

    for (let i = 0;i<size;i++){
        if (document.getElementById(i+'-'+i).classList.contains(activeSymbol) == false){
            downChecker = false;
        }

        if (document.getElementById(i+'-'+inverse).classList.contains(activeSymbol) == false){
            upChecker = false;
        }
        inverse--;
    }

    if (downChecker || upChecker){
        alert("Diagonal Win!");
    }
}

var noughtPlayerActive = true;
let size = 3;
initBoard();
addSquareEventListeners();