let numberInputs = [];
let pCount = 0;
let sCount = 0;

document.addEventListener('DOMContentLoaded',startSite);

function startSite(){
    
    //Set up listeners for number buttons.
    let numberButtonArray = document.getElementsByClassName('number-button');

    for (let i =0; i < (numberButtonArray.length-1) ; i++){
        numberButtonArray[i].addEventListener('click',addNumberToInputs);
    }
    //Set up listeners for remaining buttons. 
    document.getElementById('del').addEventListener('click',RemoveNumber);
    document.getElementById('number-solve').addEventListener('click',NumberSolve);
}

function addNumberToInputs(){
    numberInputs.push(parseInt(event.target.innerHTML));
    updateNumberOutput();
}

function RemoveNumber(){
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

function NumberSolve(){
    let inputArray = numberInputs;
    let target = parseInt(document.getElementById('target-number').value);
    pCount = 0;
    sCount = 0;

    updateNumberOutput();

    RachelRiley(inputArray, target, /*History*/ "0", /*Total*/ 0);

    addToNumberOutput('Tested '+ pCount + ' permutations.\nFound '+sCount+' solutions.')
    numberInputs = [];

}

function RachelRiley (inputArray, target, history, total) {
    if(inputArray.length == 0){
        pCount++;
        //addToNumberOutput("No Solution found: "+history);
    }
    if(target == total){
        addToNumberOutput("SOLUTION FOUND: "+target +" = "+history);
        sCount++;
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
/*
//The are n! possible permutations of n numbers, so this function was used during development to check the programme was returning the correct number of permutations.
function getFactorial(num){
    let output = 1;
    for (let j = 1;j <= num; j++){
        output *=j;
    }
    return output;
}
*/