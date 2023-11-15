// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "displayBrainTeaser") {
      console.log("Received request to display brain teaser:", request.brainTeaser);  
      displayBrainTeaser(request.brainTeaser);
    }
  });
  
  // Function to display the brain teaser on the webpage
  function displayBrainTeaser(brainTeaser) {
    console.log("Displaying brain teaser on the webpage:", brainTeaser);
    // Select a container on the webpage to display the brain teaser
    var container = document.createElement('div');
    container.style.border = '2px solid #3498db';
    container.style.padding = '10px';
    container.style.margin = '10px';
  
    // Create HTML content for the brain teaser
    var htmlContent = '<h2>Brain Teaser</h2>';
    htmlContent += '<p>' + brainTeaser.question + '</p>';
    htmlContent += '<p>Enter your answer: <input type="text" id="userAnswer"></p>';
    htmlContent += '<button onclick="checkAnswer()">Submit</button>';
    htmlContent += '<p id="result"></p>';
  
    container.innerHTML = htmlContent;
  
    // Append the container to the body of the webpage
    document.body.appendChild(container);
  
    // Function to check the user's answer
    window.checkAnswer = function() {
      var userAnswer = document.getElementById('userAnswer').value.toLowerCase();
      if (userAnswer === brainTeaser.answer.toLowerCase()) {
        document.getElementById('result').textContent = 'Correct!';
      } else {
        document.getElementById('result').textContent = 'Incorrect. Try again!';
      }
    };
  }
  