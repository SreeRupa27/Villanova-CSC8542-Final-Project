chrome.action.onClicked.addListener(function(tab) {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: displayRandomBrainTeaser
  });
});

function displayRandomBrainTeaser() {
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

  var randomQuestion = questions[Math.floor(Math.random() * questions.length)];

  chrome.tabs.sendMessage({message: "displayBrainTeaser", brainTeaser: randomQuestion});
}
