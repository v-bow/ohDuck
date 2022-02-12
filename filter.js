// bad word filter for the webpage 


const badWordListUrl = chrome.runtime.getURL("profanity_words.txt");
let badWordList = [];
fetch(badWordListUrl)
    .then(response => response.text())
    .then(text => {
        badWordList = text.split(",");
    });
