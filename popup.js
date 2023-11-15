// Function to display a random brain teaser
function displayRandomBrainTeaser() {

    console.log("Button clicked. Displaying brain teaser...");
    
    var questions = [
      {
        question: "What has keys but can't open locks?",
        answer: "a piano"
      },
      {
        question: "What belongs to you but other people use it more than you?",
        answer: "your name"
      },
      {
        question: "The person who makes it, sells it. The person who buys it never uses it. The person who uses it never knows they've got it. What is it?",
        answer: "a coffin"
      }
    ];
  
    // Select a random question
    var randomQuestion = questions[Math.floor(Math.random() * questions.length)];
  
    // Send a message to content.js to display the brain teaser
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        message: "displayBrainTeaser",
        brainTeaser: randomQuestion
      });
    });
  }
  