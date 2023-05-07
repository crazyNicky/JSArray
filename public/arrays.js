const url = 'http://localhost:3000/src';
let myArray = [];
let serviceArray =[];
let userArray = [];
const request = new Request(url, {
  method: "GET",
  headers: {
    "x-filename": "my.json"
  }
});
fetch(request)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error by GET-Request');
    }
    return response.json();
  })
  .then(data => {
    serviceArray = data;
    myArray = serviceArray.slice();
    buildSelect();
  })
  .catch(error => {
    window.alert(error)
  });
function buildSelect(){
  let selectField = document.getElementById("choice");
  try {
    selectField.innerHTML = "<option disabled selected value = \"\">Choose me...</option>";
    serviceArray.forEach(item => selectField.innerHTML += "<option value=\""+item+"\">"+item+"</option>")
  }
  catch(error){
    displayArray(myArray,false)
  }
}
function addToArray(temp,flag) {  //0 for input, 1 for select
  let inputField = document.getElementById(flag?"choice":"input");
  if (inputField.value!="")
    temp.push(inputField.value);
  inputField.flag? selectedIndex = 0 : inputField.value = ""; 
  displayArray(temp,flag)
}
function removeFromArray(temp,i,flag){
    temp.splice(i,1);
    displayArray(temp,flag)
}
function displayArray(temp,flag) {
  const output = document.getElementById("output");
  output.innerHTML = "";
  temp.sort((a,b)=>b.localeCompare(a));
  temp.forEach(item =>{ 
    output.innerHTML += "<li>"+item+
        "<button onClick =\"removeFromArray("+(flag?"userArray":"myArray")+","+
        temp.indexOf(item)+","+flag+")\">POP Me</button></li>"
    }); 
  document.getElementById("set").innerHTML = temp.length?"<button onClick=\"checkOut("+(flag?"userArray":"myArray")+","+flag+")\">Win Me</button>" : ""
}
function checkOut(temp,flag){
  const fileName = flag? "user.json":"my.json";
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "x-filename": fileName
    },
    body: JSON.stringify(temp)
  })
    .then(response => {
      document.getElementById("set").innerHTML = response.body;
    })
    .catch(error => {
      window.alert(error)
    });
}
