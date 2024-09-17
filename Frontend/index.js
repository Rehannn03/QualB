const getData = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const cryptoDropdown = document.getElementById('cryptoDropdown');
const bestPrice = document.getElementById('bestPrice');
const currencyButton = document.getElementById('currencyButton');
const buyBtn = document.getElementById('buy-btn');


const populateDropdown = (data) => {
    data.forEach(item => {
        const btn = document.createElement('button');
        btn.textContent = item.name.split('/')[0]; 
        btn.addEventListener('click', () => {
            updatePrice(item.last);
            updateCurrencyButton(item.name);
            updateBuyButton();
        });
        cryptoDropdown.appendChild(btn);
    });


    updatePrice(data[0].last);
    updateCurrencyButton(data[0].name);
    updateBuyButton(); 
};


function updatePrice(lastPrice) {
    bestPrice.textContent = `₹ ${Number(lastPrice).toLocaleString()}`;
}


function updateCurrencyButton(currencyName) {
    currencyButton.textContent = currencyName.split('/')[0];
}


function updateBuyButton() {
    buyBtn.textContent = `Buy ${currencyButton.textContent}`;
}


const init = async () => {
    const data = await getData(); 
    if (data) {
        populateDropdown(data);
    }
};


init()