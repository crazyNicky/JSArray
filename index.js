
const myArray = [];

function addToArray() {
  const inputField = document.getElementById("input");
  const inputValue = inputField.value;

  myArray.push(inputValue);
  inputField.value = "";
  displayArray();
}
function removeFromArray(i){
    myArray.splice(i,1);
    displayArray();
}
function displayArray() {
  const output = document.getElementById("output");
  output.innerHTML = "";
  myArray.forEach(item => {
    output.innerHTML += "<li>"+item+"</li><button onClick =\"removeFromArray("+myArray.indexOf(item)+")\">POP ME</button>"});
}
