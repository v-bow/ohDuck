// bad word filter for the webpage 
let badWords = 0;
let elements = [];

// Runs cleanup on the document title
let cleanup = function(badWordList) {
	elements = Array.prototype.slice.call(document.querySelectorAll("p, span, br, h1, h2, h3, h4, h5, h6, strong, em, blockquote, qhr, code, pre, ul, li, ol, mark, ins, del, sup, sub, small, i, b, a"));

	elements.forEach(function(el){
		let words = el.textContent.split(' ')
		words.forEach(function(word){
			if (badWordList.includes(word.toLowerCase())) {
  				el.innerHTML = el.innerHTML.replace(word, "🦆");
          badWords += 1
  		}
		})

	});
}

let createObserver = function(badWordList) {
	cleanup(badWordList)
	let lastUrl = location.href; 
    let observer = new MutationObserver(() => {
    	const url = location.href;
  		if (url !== lastUrl) {
    		lastUrl = url;
        	cleanup()
  		}
    }).observe(document, { subtree: true, childList: true })
}


const utterance = new SpeechSynthesisUtterance("Quack Quack Quack");
utterance.pitch = 2;
// window.speechSynthesis.speak(utterance);

const badWordListUrl = chrome.runtime.getURL("profanity_words.txt");
fetch(badWordListUrl)
    .then(response => response.text())
    .then(text => {
        let badWordList = text.split(",");
        createObserver(badWordList)
    });

// Inform the background page that 
// this tab should have a page-action.
chrome.runtime.sendMessage({
  from: 'filter',
  subject: 'showPageAction',
});

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    var domInfo = {
      percentage: Math.round(badWords / elements.length * 100) + "%"
    }

    response(domInfo);
  }
});


// function for reading the page content which is triggered when the user clicks the read content button
function readContent() {
}
