
let url = 'http:/127.0.0.1:3000/';
const myArray = [];
javascript

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error by GET-Request');
    }
    return response.json();
  })
  .then(data => {
    myArray = JSON.parse(data);
  })
  .catch(error => {
    window.alert(error)
  });

buildSelect();

function buildSelect(){
  let selectField = document.getElementById("choise");
    selectField.innerHTML = "<option disabled selected value = \"\">Choose me...</option>";
  myArray.forEach(item => 
    selectField.innerHTML += "<option value=\""+item+"\">"+item+"</option>")
}

function addToArray(flag) {  //0 for input, 1 for select
  let inputField = document.getElementById(flag?"choise":"input");
  if (inputField.value!="")
    myArray.push(inputField.value);
  inputField.flag? selectedIndex = 0 : inputField.value = ""; 

  displayArray()
}
function removeFromArray(i){
    myArray.splice(i,1);
    displayArray()
}

function displayArray() {
  const output = document.getElementById("output");
  output.innerHTML = "";
  myArray.forEach(item => 
    output.innerHTML += "<li>"+item+
        "<button onClick =\"removeFromArray("+
        myArray.indexOf(item)+")\">POP Me</button></li>");
  document.getElementById("set").innerHTML = myArray.length?"<button onClick=\"checkOut()\">Win Me</button>" : ""
}

function checkOut(){
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(myArray)
  })
    .then(response => {
      document.getElementById("set").innerHTML = response
    })
    .catch(error => {
      window.alert(error)
    });
}