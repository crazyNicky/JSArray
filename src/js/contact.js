document.getElementById("myForm").addEventListener("submit", handleForm);

function handleForm(event) {
  event.preventDefault();

  let myForm = event.target;
  let formData = new FormData(myForm);

  for (let key of formData.keys()) {
    console.log(key, formData.get(key));
  }
  let url = "http://localhost:3003";
  let request = new Request(url, {
    headers:{
        "x-filename": "input.json"
    },
    body: formData,
    method: "POST",
  });
  fetch(request)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById("legend").innerHTML = data;
        window.console.warn(data);
        myForm.reset();
    })
    .catch((error) => {
      console.warn(error);
    });
}