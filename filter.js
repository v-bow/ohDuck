// bad word filter for the webpage 

// Runs cleanup on the document title
let cleanup = function(badWordList) {
	let elements = Array.prototype.slice.call(document.querySelectorAll("a,p,h1,h2,h3,h4,h5,em,span"));

	elements.forEach(function(el){
		let words = el.textContent.split(' ')
		words.forEach(function(word){
			if (badWordList.includes(word)) {
  				el.innerHTML = el.innerHTML.replace(word, "🦆");
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



// function for reading the page content which is triggered when the user clicks the read content button
function readContent() {
}