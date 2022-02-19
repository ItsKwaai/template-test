const quoteContainer = document.getElementById('quotecontainer');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('newquote');
const loader = document.getElementById('loader');

// Show Loading
    function loading()
    {        
        loader.hidden = false;
        quoteContainer.hidden = true;
    }

// Hide Loader
function complete ()
{
if (!loader.hidden)
{
    quoteContainer.hidden = false;
    loader.hidden = true;
}
} 
// Get quote from API
async function getQuote() //delcaration
{
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
        try
            {
                const response = await fetch(proxyUrl + apiUrl);
                // the constant 'response' will not be set until 'fetch' completes...
                // and data will not be set until 'response' returns in "json" format
                const data = await response.json();
                //If author is blank, add "Unknown"
        if (data.quoteAuthor === '')
            {
                quoteAuthor.innerText = 'Unknown';
            }
        else
            {
                quoteAuthor.innerText = data.quoteAuthor;
            }     
            
            // Reduce font size for long quotes
        if (data.quoteText.length > 100)
            {
                quoteText.classList.add('longquote');
            }
        else
            {
                quoteText.classList.remove('longquote');  
            }
                quoteText.innerText = data.quoteText;
               
            // Stop Loader & Show Quote
                complete();
                console.log(data);

            }
        catch (error)
            {
                getQuote();
                console.log('whoops, no quote', error);
            }
}

        // Twitter Function to Tweet quote
        function tweetQuote ()
        {
            const quote = quoteText.innerText;
            const author = quoteAuthor.innerText
            const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
            window.open(twitterUrl, '_blank');
        }

        // Event Listeners
        newQuoteBtn.addEventListener('click', getQuote);
        twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
