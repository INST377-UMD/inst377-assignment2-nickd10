async function getQuote() {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();

    document.getElementById("quote").innerHTML = `"${data[0].q}" - ${data[0].a}`;
}

window.onload = getQuote;