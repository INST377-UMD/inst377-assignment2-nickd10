async function getQuote() {
    const quoteResponse = await fetch('https://zenquotes.io/api/random');
    const data = await quoteResponse.json();
    document.getElementById("quote").innerHTML = `"${data[0].q}" - ${data[0].a}`;
}

async function getStockData() {
    const tickerResponse = await fetch('https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&limit=120&apiKey=YOUR_API_KEY');
    const tickerData = await tickerResponse.json();
    console.log('Retrieved Data: ', tickerData);
}

async function getDogImages() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random/10');
    const data = await response.json();
    const imageUrls = data.message;

    const slider = document.getElementById('myslider');
    slider.innerHTML = "";

    imageUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.style.width = "100%";
        img.style.height = "100%";
        slider.appendChild(img);
    });

    simpleslider.getSlider({
        container: slider,
        duration: 1,
        delay: 3
    });
}

async function getDogBreeds() {
    const breedResponse = await fetch('https://dogapi.dog/api/v2/breeds');
    const breedData = await breedResponse.json();
    const breeds = breedData.data;
    console.log(breedData.data);

    const buttonsContainer = document.getElementById('dog-buttons');
    const infoContainer = document.getElementById('breed-info');

    breeds.forEach(breed => {
        const name = breed.attributes.name;
        const description = breed.attributes.description || "No description available.";
        const lifeMin = breed.attributes.life.min || "N/A";
        const lifeMax = breed.attributes.life.max || "N/A";

        const button = document.createElement('button');
        button.innerText = name;
        button.className = 'button-9';

        button.addEventListener('click', () => {
            infoContainer.innerHTML = `
                <h2>${name}</h2>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Min Life:<strong> ${lifeMin}<p>
                <p><strong>Max Life:<strong> ${lifeMax}<p>
            `;
        });

        buttonsContainer.appendChild(button);
    });
}


window.onload = async function () {
    const path = window.location.pathname;

    if (path.includes("Home.html")) {
        await getQuote();
    }

    if (path.includes("Stocks.html")) {
        await getStockData();
    }

    if (path.includes("Dogs.html")) {
        await getDogImages();
        await getDogBreeds();
    } 
};
