/*
    Next steps:
    - dynamic square sizing: DONE!
    - nought/cross image auto resize : DONE!
    - Custom game initiation screen: DONE!
    - Game restart bar: DONE!
    - tidy option bars: DONE!
    - AI: DONE!
    - networkiiiing!
*/

var noughtPlayerActive = true;
let size = 0;
let p1name = 'A';
let p1type = ""
let p2name = 'B';
let p2type = ""
let gametype = '';
let isWon = false;

document.addEventListener('DOMContentLoaded',startSite);

function startSite(){
    //document.getElementById('options1').addEventListener('click',getMoreOptions);
    document.getElementById('starter').addEventListener('click',setOptions);
    document.getElementById('play-again').addEventListener('click', restart);
    document.getElementById('change-options').addEventListener('click', changeOptions);
    document.getElementById('ai').addEventListener('click',options2Ai);
    document.getElementById('hotseat').addEventListener('click',options2Hotseat);

    /*
    document.getElementById('hider').addEventListener('click', 
        function() {
            document.getElementById('restart-buttons').classList.toggle('invisible');
        }
    );
    */
}

function options2Ai(){
    document.getElementById('pname2').disabled = true;
    document.getElementById('pname2').value = getRobotName();
    document.getElementById('pname2-label').innerHTML = "Your robot friend is:"
}

function options2Hotseat(){
    document.getElementById('pname2').disabled = false;
    document.getElementById('pname2').value = "B";
    document.getElementById('pname2-label').innerHTML = "And your friend's name?"
}

//function getMoreOptions(){ document.getElementById('options2').classList.toggle('invisible'); }

function setOptions(){


    for (var i of document.getElementsByName('gametype')){
        if (i.checked){
            gametype = i.value;
        }
    }

    size = document.getElementById('boardsize').value;

    p1name = document.getElementById('pname1').value;
    p1type = 'hotseat';
    p2name = document.getElementById('pname2').value;
    if (gametype == 'ai') {
        p2type = 'ai';
    } else {
        p2type = 'hotseat';
    }
    
    document.getElementById('setup').classList.toggle('invisible');

    if (Math.random() >=0.5){
        initBoard(size, p1name, p1type, p2name, p2type);
    } else {
        let temp = "";
        temp = p1name;
        p1name = p2name;
        p2name = temp;
        temp = p2type;
        p2type = p1type
        p1type = temp;
        initBoard(size, /*p2name, p2type, p1name, p1type*/);
    }  
}

function changeOptions(){
    document.getElementById('setup').classList.toggle('invisible');
    document.getElementById('restart-buttons').classList.toggle('invisible');
}

function initBoard(size, /*p1name, p1type, p2name, p2type*/){
    alert(p1name+', you go first!');
    noughtPlayerActive = true;
    isWon = false;
    let board = document.getElementById('board');
    board.innerHTML = "";
    document.getElementById('p1').innerHTML = '';
    document.getElementById('p1').classList.add('active');
    document.getElementById('p2').innerHTML = '';
    document.getElementById('p2').classList.remove('active');


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

    if (p1type == 'ai'){
        AITakeTurn();
    }

}

function AITakeTurn(){
    let emptySquares = Array.from(document.getElementsByClassName('square'));
    emptySquares = emptySquares.filter(x => (!x.classList.contains('nought') && !x.classList.contains('cross')));
    let randoNum = Math.floor(Math.random()*emptySquares.length);
    //alert("AI wants to click on: " + emptySquares[randoNum].id);
    fillSquare(emptySquares[randoNum]);

}

function restart(){
    document.getElementById('restart-buttons').classList.toggle('invisible');

    if (Math.random() >=0.5){
        initBoard(size, p1name, p1type, p2name, p2type);
    } else {
        let temp = "";
        temp = p1name;
        p1name = p2name;
        p2name = temp;
        temp = p2type;
        p2type = p1type
        p1type = temp;
        initBoard(size, /*p2name, p2type, p1name, p1type*/);
    } 
}

function addSquareEventListeners(){
    let squares = document.getElementsByClassName('square');
    for (let i of squares){
        i.addEventListener('click',clickSquare);
    }
}

function fillSquare(square){
    if (noughtPlayerActive){
        square.classList.add('nought');
        document.getElementById('p2').innerHTML += "<br>It's your turn.";
        document.getElementById('p1').innerHTML = document.getElementById('p1').innerHTML.replace("<br>It's your turn.","");
    } else {
        square.classList.add('cross');
        document.getElementById('p1').innerHTML += "<br>It's your turn.";
        document.getElementById('p2').innerHTML = document.getElementById('p2').innerHTML.replace("<br>It's your turn.","");
        
    }
    square.removeEventListener('click',fillSquare);
    checkForWin();
    if (isWon == false){
        switchActivePlayer();    
    }
    
}

function clickSquare() {
    fillSquare(event.target);
}

function switchActivePlayer(){

    noughtPlayerActive = !noughtPlayerActive;
    document.getElementById('p1').classList.toggle('active');
    document.getElementById('p2').classList.toggle('active');

    if (noughtPlayerActive && p1type == 'ai'){
        AITakeTurn();
    } else if (!noughtPlayerActive && p2type == 'ai'){
        AITakeTurn();
    }

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
    isWon = true;

    for (let x of document.getElementsByClassName('square')){
        x.removeEventListener('click', clickSquare);
    }

    document.getElementById('restart-buttons').classList.toggle('invisible');
}

function getRobotName(){
    let robotNames = ["HAL9000","BB-8","C3PO","R. Daneel Olivaw","T-1000","JARVIS"];

    return robotNames[Math.floor(Math.random()*robotNames.length)];
}