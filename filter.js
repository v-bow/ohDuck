// bad word filter for the webpage 

console.log('extension run');

// Google's bad word filter:
// https://gist.githubusercontent.com/jamiew/1112488/raw/7ca9b1669e1c24b27c66174762cb04e14cf05aa7/google_twunter_lol
let badWords = "ice|north|and|how|extension".split('|') // loool

// Runs cleanup on the document title
let cleanup = word => {
    document.body.innerHTML = document.body.innerHTML.split(' ').map(word => {
        return badWords.indexOf(word.toLowerCase()) != -1 ? '🦆'.repeat(word.length) : word
    }).join(' ')
}

// Kick off initial page load check
cleanup()