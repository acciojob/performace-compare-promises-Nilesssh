const apiUrls = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3",
  "https://jsonplaceholder.typicode.com/todos/4",
  "https://jsonplaceholder.typicode.com/todos/5",
  "https://jsonplaceholder.typicode.com/todos/6",
  "https://jsonplaceholder.typicode.com/todos/7",
  "https://jsonplaceholder.typicode.com/todos/8",
  "https://jsonplaceholder.typicode.com/todos/9",
  "https://jsonplaceholder.typicode.com/todos/18",
];

function fetchDataWithPromiseAll(apiUrls) {
  const startTime = new Date().getTime();

  const promises = apiUrls.map((url) => fetch(url));

  return Promise.all(promises)
    .then(() => {
      const endTime = new Date().getTime();
      const timeTaken = endTime - startTime;
		document.querySelector("#output-all").textContent = timeTaken ;
      return timeTaken;
    })
    .catch((error) => {
      console.error("Error:", error);
      return -1;
    });
}

function fetchDataWithPromiseAny(apiUrls) {
  const startTime = new Date().getTime();

  const promises = apiUrls.map((url) => fetch(url));

  return Promise.any(promises)
    .then(() => {
      const endTime = new Date().getTime();
      const timeTaken = endTime - startTime;
		document.querySelector("#output-any").textContent = timeTaken ;
      return timeTaken;
    })
    .catch((error) => {
      console.error("Error:", error);
      return -1;
    });
}

// Displaying results on the webpage
const table = document.getElementById("results-table");

// Function to add a row to the table
function addRow(method, timeTaken) {
  const row = table.insertRow();
  const methodCell = row.insertCell();
  const timeTakenCell = row.insertCell();

  methodCell.textContent = method;
  timeTakenCell.textContent = timeTaken;
}

// Fetch data using Promise.all and display the time taken
fetchDataWithPromiseAll(apiUrls)
  .then((timeTaken) => {
    addRow("Promise.all", timeTaken);
  })
  .catch((error) => {
    console.error("Error:", error);
    addRow("Promise.all", "Error");
  });

// Fetch data using Promise.any and display the time taken
fetchDataWithPromiseAny(apiUrls)
  .then((timeTaken) => {
    addRow("Promise.any", timeTaken);
  })
  .catch((error) => {
    console.error("Error:", error);
    addRow("Promise.any", "Error");
  });
