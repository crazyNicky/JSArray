document.getElementById("myForm").addEventListener("submit", (event)=> {
  event.preventDefault();
  let myForm = event.target;
  let formData = new FormData(myForm);
  let request = new Request("http://localhost:3003", {
    body: formData,
    method: "POST",
  });
  fetch(request)
    .then((response) => {
      myForm.dispatchEvent(new Event("reset", { bubbles: true, cancelable: true }));
      window.alert(response);
    })
    .catch((error) => window.alert(error));
});
