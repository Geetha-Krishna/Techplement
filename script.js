document.addEventListener('DOMContentLoaded', function() {
    const quoteElement = document.getElementById('quote');
    const randomButton = document.getElementById('randomButton');
    const searchButton = document.getElementById('searchButton');
    const authorSearch = document.getElementById('authorSearch');

    randomButton.addEventListener('click', getRandomQuote);
    searchButton.addEventListener('click', searchByAuthor);

    function displayQuote(quoteText, author) {
        quoteElement.innerHTML = `<p>${quoteText}</p><p>- ${author}</p>`;
    }

    function getRandomQuote() {
        fetch('https://api.quotable.io/random')
            .then(response => response.json())
            .then(data => {
                const quoteText = data.content;
                const quoteAuthor = data.author;
                displayQuote(quoteText, quoteAuthor);
            })
            .catch(error => console.error('Error fetching random quote:', error));
    }

    function searchByAuthor() {
        const authorName = authorSearch.value.trim();
        if (authorName !== '') {
            fetch(`https://api.quotable.io/quotes?author=${authorName}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results.length > 0) {
                        const randomIndex = Math.floor(Math.random() * data.results.length);
                        const quote = data.results[randomIndex];
                        const quoteText = quote.content;
                        const quoteAuthor = quote.author;
                        
                        displayQuote(quoteText, quoteAuthor);
                    } else {
                        quoteElement.innerHTML = `<p>No quotes found for ${authorName}</p>`;
                    }
                })
                .catch(error => console.error('Error searching quotes by author:', error));
        } else {
            alert('Please enter an author name to search.');
        }
    }
});
