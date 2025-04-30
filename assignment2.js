async function getQuote() {
    const quoteResponse = await fetch('https://zenquotes.io/api/random');
    const data = await quoteResponse.json();

    document.getElementById("quote").innerHTML = `"${data[0].q}" - ${data[0].a}`;
}

async function getStockData() {
    const tickerResponse = await fetch('https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&limit=120&apiKey=');
    const tickerData = await tickerResponse.json();

    console.log('Retrieved Data: ', tickerData);
}

async function getDogImages() {
    const dogImageResponse = await fetch('https://dog.ceo/api/breeds/image/random/10');
    const dogImageData = await dogImageResponse.json();

    console.log('Retrieved Data: ', dogImageData);
}

window.onload = async function() {
    await getQuote();
    await getStockData();
    await getDogImages();
};
