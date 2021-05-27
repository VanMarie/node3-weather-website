//const to store the viarable
const weatherForm = document.querySelector("form"); //form get from index
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); //prevent to refresh the server

  const location = search.value; //value extracts the input value which watever you type

  messageOne.textContent = "Loading...";
  messageTwo.textContent = " ";

  //fetch is a function  // then run the function
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
