//Crazy Nicky

const sendBtn = document.querySelector('#sendBtn');
sendBtn.addEventListener('click', sendRecord);
function sendRecord(){
    let anrede = document.querySelector('#anrede');
    let firstname = document.querySelector('#firstname');
    let secondname = document.querySelector('#secondname');
    let email = document.querySelector('#email');
    let nachricht = document.querySelector('#nachricht');
    let newRecord = new {anrede,firstname,secondname,email,nachricht};
    //data.push(newRecord);
}

