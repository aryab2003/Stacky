// Initialize history stack from sessionStorage if available
let historyStack = JSON.parse(sessionStorage.getItem("historyStack")) || [];

// adding a url to the history stack
function addUrl() {
  const urlInput = document.getElementById("urlInput");
  const url = urlInput.value.trim();

  if (url !== "") {
    // Check if the URL already exists in history
    const index = historyStack.indexOf(url);
    if (index !== -1) {
      // If it exists, remove it from its current position
      historyStack.splice(index, 1);
    }
    historyStack.push(url);
    displayHistory();
    urlInput.value = "";
    window.location.href = url;
    saveHistory();
  }
}

// going back to the previous url
function goBack() {
  if (historyStack.length > 0) {
    historyStack.pop();
    displayHistory();
    saveHistory();
  } else {
    alert("No history available to go back!");
  }
}

// clear browsing history
function clearHistory() {
  historyStack = [];
  saveHistory();
  displayHistory();
}

//to display the history stack
function displayHistory() {
  const currentUrl =
    historyStack.length > 0 ? historyStack[historyStack.length - 1] : "";
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = ""; // Clear the previous history

  // Display current URL at the top
  const currentListItem = document.createElement("li");
  currentListItem.textContent = "Current URL: " + currentUrl;
  historyList.appendChild(currentListItem);

  // Display history URLs except the current URL
  historyStack.slice(0, -1).forEach((url) => {
    const listItem = document.createElement("li");
    listItem.textContent = url;
    listItem.style.cursor = "pointer"; // Add pointer cursor to indicate clickable
    listItem.onclick = () => {
      // Add click event to visit history URL
      window.location.href = url;
    };
    historyList.appendChild(listItem);
  });
}

// Function to save history stack to sessionStorage
function saveHistory() {
  sessionStorage.setItem("historyStack", JSON.stringify(historyStack));
}

window.onload = function () {
  displayHistory();
};
