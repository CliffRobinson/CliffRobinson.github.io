var numberInputs = [];

document.addEventListener('DOMContentLoaded',startSite);

function startSite(){
    
    //Set up listeners for number buttons.
    var numberButtonArray = document.getElementsByClassName('number-button');

    for (var i =0; i < (numberButtonArray.length-1) ; i++){
        numberButtonArray[i].addEventListener('click',addNumberToInputs);
    }

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
    var inputArray = numberInputs;
    var target = parseInt(document.getElementById('target-number').value);

    RachelRiley(inputArray, target, /*History*/ "", /*Total*/ 0);
}

function RachelRiley (inputArray, target, history, total) {
    if(target == total){
        addToNumberOutput("SOLUTION FOUND: "+target +" = "+history);
    } else {
        let workingArray = [];
        let currentNum = 0;
        for (let i = 0; i< inputArray.length; i++){
            workingArray = inputArray.slice() //creates a copy of the existing array.
            currentNum = workingArray[i];
            workingArray.splice(i,1);
            addToNumberOutput('Total is: '+total+', CurrentNum is ['+currentNum+'], Array is : '+workingArray.toString());
            RachelRiley(workingArray, target,(history+currentNum+'+'), (total+currentNum));
        }

        

    }
}