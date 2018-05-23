let letterInput = "";
let lpCount = 0;
let lsCount = 0;

let numberInputs = [];
let npCount = 0;
let nsCount = 0;

document.addEventListener('DOMContentLoaded',startSite);

function startSite(){
    
    //set up listeners for letter problem buttons

    document.getElementById('letter-solve').addEventListener('click', letterSolve);

    //Set up listeners for digit buttons.
    let numberButtonArray = document.getElementsByClassName('number-button');

    for (let i =0; i < (numberButtonArray.length-1) ; i++){
        numberButtonArray[i].addEventListener('click',addNumberToInputs);
    }
    //Set up listeners for other number solving buttons. 
    document.getElementById('del').addEventListener('click',removeNumber);
    document.getElementById('number-solve').addEventListener('click',numberSolve);
}

////////////////////////////////////////////    LETTER FUNCTIONS /////////////////////////////////////////////////

function letterSolve(){
    lpCount = 0;
    lsCount = 0;
    letterInput = document.getElementById('letters-input').value.toLowerCase();         //Lower case the input
    letterInput = letterInput.replace(/[^a-z]/g,"");                                    //Remove non-letters
    updateLetterOutput();
    letterInput = letterInput.split("");    
    letterInput = letterInput.sort().join("");                                          //Alphabetically sort the input.
    addToLetterOutput("Alpha sorted input is: "+letterInput);

    let permSet = new Set();                                                            //A set to hold permutations of letters.

    /*for (let i = 0;i<letterInput.length;i++){
        permSet.add(letterInput.charAt(i));
    }*/

    suzyDent(letterInput,"",letterInput.length, permSet);
    /*
    permSet.add('ANIMATRONICS!'.toLowerCase());
    permSet.add("RECALCITRANCE!".toLowerCase());
    permSet.add('ZEITGIEST!'.toLowerCase());
    permSet = Array.from(permSet).sort();
    */
    

    for (let perm of permSet){
        addToLetterOutput(perm);
    }

    addToLetterOutput("Algorithm found "+lpCount+" permutations, should find " + getFactorial(letterInput.length));
/*
    var reader = new FileReader("./files/testDictionary.text");

    reader.onload = function(e) {
        var text = reader.result;
      }

    reader.readAsText()

    for (let word of dictArray){
        addToLetterOutput(word);
    }
*/
    

}

function updateLetterOutput(){
    document.getElementById('letters-output').innerHTML = "Input is: "+letterInput;
}

function addToLetterOutput(input){
    document.getElementById('letters-output').innerHTML += "\n"+input;
}

function suzyDent(input, stringSoFar, targetLength, permSet) {
    if (stringSoFar.length == targetLength) {
        permSet.add(stringSoFar);
        lpCount++;
    } else {
        let currentChar = '';

        for (let i = 0;i<input.length;i++){
            currentChar = input.charAt(i);
            let newStringSoFar = stringSoFar.concat(currentChar);
            let newInput = removeCharAt(input,i);
            //permSet.add("Current Char is: "+currentChar+", remaining string is: "+newInput);
            suzyDent(newInput, newStringSoFar, targetLength, permSet);
        }
    }
}

function removeCharAt(InputString, index) {
    let firstHalf = InputString.substring(0,index);
    let secondHalf = InputString.substring(index+1,InputString.length);
    return firstHalf+secondHalf;
}

////////////////////////////////////////////    NUMBER FUNCTIONS /////////////////////////////////////////////////


function addNumberToInputs(){
    numberInputs.push(parseInt(event.target.innerHTML));
    updateNumberOutput();
}

function removeNumber(){
    numberInputs.pop();
    updateNumberOutput();
}

function updateNumberOutput(){
    document.getElementById('numbers-output').innerHTML = "Numbers are: "+numberInputs.toString();
    document.getElementById('numbers-output').innerHTML +="\nTarget is: "+document.getElementById('target-number').value;
}

function addToNumberOutput(input){
    document.getElementById('numbers-output').innerHTML +="\n"+input;
}

function numberSolve(){
    let inputArray = numberInputs;
    let target = parseInt(document.getElementById('target-number').value);
    npCount = 0;
    nsCount = 0;

    updateNumberOutput();

    RachelRiley(inputArray, target, /*History*/ "0", /*Total*/ 0);

    addToNumberOutput('Tested '+ npCount + ' permutations.\nFound '+nsCount+' solutions.')
    numberInputs = [];

}

function RachelRiley (inputArray, target, history, total) {
    if(inputArray.length == 0){
        npCount++;
        //addToNumberOutput("No Solution found: "+history);
    }
    if(target == total){
        addToNumberOutput("SOLUTION FOUND: "+target +" = "+history);
        nsCount++;
    } else {
        let workingArray = [];
        let currentNum = 0;
        for (let i = 0; i< inputArray.length; i++){
            workingArray = inputArray.slice()                       //creates a copy of the existing array.
            currentNum = workingArray[i];                           //picks a number out of it.
            workingArray.splice(i,1);                               //and removes that number from the array.

            //addToNumberOutput('Total is: '+total+', CurrentNum is ['+currentNum+'], Array is : '+workingArray.toString());

            RachelRiley(workingArray, target,(history+' + '+currentNum), (total+currentNum)); 
            //Adds the current number and calls the function again on the remaining numbers. 
            
            if (total != 0){ 
                //Tries subtracting the current number from the total, and multiplying it by the total, but only if the total is not zero. 
                RachelRiley(workingArray, target,(history+' - '+currentNum), (total-currentNum));
                RachelRiley(workingArray, target,(history+' * '+currentNum), (total*currentNum));
            }
            if (total != 0 && currentNum != 0 && total%currentNum == 0 ) {
                //Tries dividing the total by the current number, but only if that will produce a meaningful integer. 
                RachelRiley(workingArray, target,(history+' / '+currentNum), (total/currentNum));
            }
        }

        

    }
}

////////////////////////////////////////////    MISC FUNCTIONS /////////////////////////////////////////////////


//The are n! possible permutations of n numbers, so this function was used during development to check the programme was returning the correct number of permutations.
function getFactorial(num){
    let output = 1;
    for (let j = 1;j <= num; j++){
        output *=j;
    }
    return output;
}
