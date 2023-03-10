// HTML elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get Quotes from API
let apiQuotes = [];

//Show loader

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Remove loading spinner

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is null
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
    authorText.textContent = quote.author;
    }
    // Check the quote length to change font-size
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set quote, Hide loader
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // getQuotes()
        console.log(error)
    }
}

// Getting new quote on click
newQuoteBtn.addEventListener('click', () => {
    getQuotes();
});

// Tweet quote
function tweetQuote() {
    const tweetUrl = `https://twitter.com/compose/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweetUrl, '_blank')
}
twitterBtn.addEventListener('click', () => {
    tweetQuote();
})
// On Load
getQuotes();
