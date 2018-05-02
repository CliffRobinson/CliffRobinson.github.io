function caesar(str,t) { // LBH QVQ VG!
    let untwisted = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let twisted = [];
    let twist = t;
    //console.log('Twist is:'+twist);
    for (let i = 0;(i+twist)<untwisted.length;i++){
      //console.log('Loop 1 iteration: '+i);
      twisted.push(untwisted[i+twist]);
    }  
    
    for (let j = 0;j<twist;j++){
      //console.log('Loop 2 iteration: '+j);
      twisted.push(untwisted[j]);
    }
    
    let lookUp = {};
    
    for (let k = 0; k < twisted.length;k++){
      ;
      lookUp[twisted[k]] = untwisted[k];
    }
    

    let output = "";
    
    for (let l = 0; l<str.length;l++){
      if (lookUp.hasOwnProperty(str[l])){
        output += lookUp[str[l]];
      } else {
        output += str[l]; 
      }   
    }
    
    return output;
    
  }

  function pressDecodeButton(){
    
    decodeField.value = caesar(encodeField.value.toUpperCase(),parseInt(shiftSelector.value));
  }

  function pressEncodeButton(){
    
    encodeField.value = caesar(decodeField.value.toUpperCase(),(26-parseInt(shiftSelector.value)));
  }

let decodeField = document.getElementById('decoded');
let encodeField = document.getElementById('encoded');
let shiftSelector = document.getElementById('shiftSelect');

for (let i = 1; i<26;i++){
  shiftSelector.innerHTML += '<option value='+i+'>'+i+'</option>';
}

document.getElementById('decode').addEventListener("click",pressDecodeButton);
document.getElementById('encode').addEventListener("click",pressEncodeButton);




