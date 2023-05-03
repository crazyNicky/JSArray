
const myArray = [];

function addToArray() {
  const inputField = document.getElementById("input");
  const inputValue = inputField.value;

  myArray.push(inputValue);
  inputField.value = "";
  displayArray();
}

function displayArray() {
  const output = document.getElementById("output");
  output.innerHTML = "";
  myArray.forEach(item =>{
    output.innerHTML += "<li>"+item+"</li>"});
}
