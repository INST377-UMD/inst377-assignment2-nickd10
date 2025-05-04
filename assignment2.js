async function getQuote() {
    const quoteResponse = await fetch('https://zenquotes.io/api/random');
    const data = await quoteResponse.json();
    document.getElementById("quote").innerHTML = `"${data[0].q}" - ${data[0].a}`;
}

let stockChart;

async function getStockData(event) {
    event.preventDefault();

    const ticker = document.getElementById('stockTicker').value.toUpperCase();
    const timeChoice = parseInt(document.getElementById('timeChoices').value);

    const today = new Date();
    const pastData = new Date();
    pastData.setDate(today.getDate() - timeChoice);

    const todayFormatted = today.toISOString().split('T')[0];
    const pastFormatted = pastData.toISOString().split('T')[0];

    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${pastFormatted}/${todayFormatted}?adjusted=true&sort=asc&limit=120&apiKey=24f7hnPtrULLMs_SVxjMgoIpRJPMg8Q2`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function populateStockChart(event) {
    const data = await getStockData(event);

    const labels = data.results.map(entry => new Date(entry.t).toISOString().split('T')[0]);
    const prices = data.results.map(entry => entry.c);

    if (stockChart) stockChart.destroy();

    const ctx = document.getElementById('myStockChart').getContext('2d');
    stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Closing Prices for ${data.ticker}`,
                data: prices,
                borderColor: 'blue',
                backgroundColor: 'rgba(173, 216, 230, 0.2)',
                fill: true,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Closing Price ($)'
                    }
                }
            }
        }
    });
}

async function stockTable() {
    const redditResponse = await fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03');
    const redditData = await redditResponse.json();

    const sortedData = redditData.sort((a, b) => b.no_of_comments - a.no_of_comments);

    const top5 = sortedData.slice(0, 5);

    const table = document.getElementById('redditStockChart');

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    top5.forEach(stock => {
        const row = document.createElement('tr');

        const tickerCell = document.createElement('td');
        const tickerLink = document.createElement('a');
        tickerLink.href = `https://finance.yahoo.com/quote/${stock.ticker}`;
        tickerLink.textContent = stock.ticker;
        tickerLink.target = '_blank';
        tickerCell.appendChild(tickerLink);
        row.appendChild(tickerCell);

        const commentsCell = document.createElement('td');
        commentsCell.textContent = stock.no_of_comments;
        row.appendChild(commentsCell);

        const sentimentCell = document.createElement('td');
        const icon = document.createElement('span');
        if (stock.sentiment === "Bullish") {
            icon.textContent = "📈";
        } else if (stock.sentiment === "Bearish") {
            icon.textContent = "📉";
        }
        sentimentCell.appendChild(icon);
        row.appendChild(sentimentCell);

        table.appendChild(row);
    });
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
        const description = breed.attributes.description;
        const lifeMin = breed.attributes.life.min;
        const lifeMax = breed.attributes.life.max;

        const button = document.createElement('button');
        button.innerText = name;
        button.className = 'button-9';
        button.id = name;

        button.addEventListener('click', () => {
            infoContainer.innerHTML = `
                <h2>${name}</h2>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Min Life:<strong> ${lifeMin}<p>
                <p><strong>Max Life:<strong> ${lifeMax}<p>
            `;
            document.getElementById('breed-info').style.display = 'block';
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
        stockTable();
    }

    if (path.includes("Dogs.html")) {
        await getDogImages();
        await getDogBreeds();
    } 
};
