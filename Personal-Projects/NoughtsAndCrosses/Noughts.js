/*
    Next steps:
    - dynamic square sizing: DONE!
    - nought/cross image auto resize : DONE!
    - Custom game initiation screen: DONE!
    - Game restart bar.
    - networkiiiing!
*/

var noughtPlayerActive = true;
let size = 0;
let p1name = 'A';
let p2name = 'B';

document.addEventListener('DOMContentLoaded',startSite);

function startSite(){
    document.getElementById('options1').addEventListener('click',getMoreOptions);
    document.getElementById('starter').addEventListener('click',setOptions);
}



function getMoreOptions(){
    document.getElementById('options2').classList.toggle('invisible');
}

function setOptions(){
    let gametype = '';

    for (var i of document.getElementsByName('gametype')){
        if (i.checked){
            gametype = i.value;
        }
    }

    size = document.getElementById('boardsize').value;

    p1name = document.getElementById('pname1').value;
    p2name = document.getElementById('pname2').value;
    

    alert(
        'Gametype = '+gametype+
        '\nP1name = '+ p1name+
        '\nP2name = '+ p2name+
        '\nBoard size = '+size

    );
    document.getElementById('setup').classList.toggle('invisible');

    if (Math.random >=0.5){
        initBoard(size, p1name, p2name);
    } else{
        initBoard(size, p2name, p1name);
    }

    
}

function initBoard(size, p1name, p2name){
    alert(p1name+', you go first!');
    let board = document.getElementById('board');
    //let p1name = 'Cliff';
    //let p2name = 'Kytheon Iora';

    for (let i = 0; i<size;i++){
        for (let j = 0; j<size;j++){
            board.innerHTML += '<div class="square" id="'+i+'-'+j+'"></div>';
            //Square '+i+'-'+j+'
        }
    }

    addSquareEventListeners();

    document.getElementById('p1').innerHTML = "Player 1: "+p1name+",<br>You're playing Os.<br>It's your turn.";
    document.getElementById('p2').innerHTML = "Player 2: "+p2name+",<br>You're playing Xs."

    document.getElementsByTagName('head')[0].innerHTML += '<style> .square { width:'+(100/size)+'%; }  </style>';

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
            activePlayerWins();            
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
        activePlayerWins();       
    }
}

function activePlayerWins(){
    if (noughtPlayerActive){
        alert (p1name+', you win! Congratulations');
    } else {
        alert (p2name+', you win! Congratulations');
    }
}

