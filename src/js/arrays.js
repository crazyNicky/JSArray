const url = 'http://localhost:3003';
let myArray = [];
let serviceArray =[];
let userArray = [];
function switchSource(flag){
  if(flag)return "my.json";
  try {
    return (window.getComputedStyle(document.querySelector(":root")).getPropertyValue("--id-show")=="s04") ? "fakenames.json" : "my.json"} 
  catch (error) {
    return "my.json"}
}
function getFromServer(flag){
  const request = new Request(url, {
  method: "GET",
  headers: {
    "x-filename": switchSource(flag)
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
    if(flag)buildSelect();
  })
  .catch(error => {
    window.alert(error)
  });
}
function buildSelect(){
  let selectField = document.getElementById("choice");
  try {
    selectField.innerHTML = "<option disabled selected value = \"\">Choose me...</option>";
    serviceArray.forEach(item => selectField.innerHTML += "<option value=\""+item+"\">"+item+"</option>")
  }catch(error){}
}
function addToArray(temp,flag) {  //0 for input, 1 for select
  let inputField = document.getElementById(flag?"choice":"input");
  if (inputField.value!="")
    temp.push(inputField.value);
  else
    getFromServer(false);  
  inputField.flag? selectedIndex = 0 : inputField.value = ""; 
  displayArray(temp,flag)
}
function removeFromArray(temp,i,flag){
    temp.splice(i,1);
    displayArray(temp,flag)
}
function displayArray(temp,flag) {
  const output = document.getElementById(flag?"selected":"inputed");
  const checkout = document.getElementById("checkout");
  output.innerHTML = "";
  temp.sort((a,b)=>a.localeCompare(b));
  temp.forEach(item =>{ 
    output.innerHTML += "<li>"+item+
        "<button onClick =\"removeFromArray("+(flag?"userArray":"myArray")+","+
        temp.indexOf(item)+","+flag+")\">POP Me</button></li>"
    }); 
    checkout.innerHTML = (temp.length)?"<button onClick=\"checkOut("+(flag?"userArray":"myArray")+","+flag+")\">Buy Me</button>" :"";
    if(!(temp.length||flag))output.innerHTML =
      "<img id=\"pp\" src=\"../src/img/pp.png\" href=\"https://www.paypal.com/de/signin\" alt=\"Hier könnte Ihre Werbung stehen\"><b><i><h3>Hier könnte IHRE Werbung stehen...</h3></i></b>";
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
getFromServer(true);
