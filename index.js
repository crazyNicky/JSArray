
const myArray = [];
function checkOut([]){
    //to do later
    return;
}
var inputField;
function addToArray() {
  inputField = document.getElementById("input");
  if (inputField.value!="")
    myArray.push(inputField.value);
  inputField.value = "";
  displayArray();
}
function removeFromArray(i){
    myArray.splice(i,1);
    displayArray();
}
function buyArray(){
    checkOut(myArray);
    myArray.splice(0,myArray.length);
    inputField.value = "";
    displayArray();
}
function displayArray() {
  const output = document.getElementById("output");
  output.innerHTML = "";
  myArray.forEach(item => 
    output.innerHTML += "<li>"+item+
        "<button onClick =\"removeFromArray("+
        myArray.indexOf(item)+")\">POP Me</button></li>");
  document.getElementById("buy").innerHTML = myArray.length?"<button onClick=\"buyArray()\">Win Me</button>" : "";
}
