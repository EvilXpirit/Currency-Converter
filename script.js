const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for(let i = 0; i < dropList.length; i++){
    for(currency_code in country_list){
        // it selects usd and inr by default
        let selected; 
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        } else if (i == 1) { //for loop runs separately for both select tags so else if will be execulted and INR is selected cuz index is 1
            selected = currency_code == "INR" ? "selected" : "";
        }
        // console.log(currency_code)
        // this creates optiontag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserting options tag inside select tag 
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target); //calling loadFlag with passing target element as an argument
    })
}

function loadFlag(element){
    for(code in country_list){
        if(code == element.value){ //if currency code of the country list is equal to option value 
            let imgTag = element.parentElement.querySelector("img"); //it selects img tag of a particular droplist
            // it passes country code of a selected currency code in the img url
            imgTag.src = `https://flagsapi.com/${country_list[code]}/flat/64.png`;
        }
    }
}

window.addEventListener("load", () =>{
    // it triggers getExchangeRate function
    getExchangeRate(); 
});

getButton.addEventListener("click", e =>{
    e.preventDefault(); // it prevents from submitting
    getExchangeRate(); // it triggers getExchangeRate function
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () =>{
    let tempCode = fromCurrency.value; // temporary currency code of FROM drop list
    fromCurrency.value = toCurrency.value; // passing TO currency code FROM currency code
    toCurrency.value = tempCode; // passing temporary currency code to TO currency code
    loadFlag(fromCurrency); //passing loadFlag with passing select element (fromCurrency) of FROM
    loadFlag(toCurrency); //passing loadFlag with passing select element (toCurrency) of FROM
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    exchangeRateText = document.querySelector(".exchange-rate");
    let amountval = amount.value; // it gets the value from input field
    // this will set 1 as default value if we enter 0 or nothing
    if (!isNaN(amountval) && isFinite(amountval)) {
        if(amountval == "0" || amountval == ""){
            amount.value = "1";
            amountval = 1;
        }
        exchangeRateText.innerText = "Getting Exchange Rate...";

        // do not use this api, its stictly prohibited, use your own
        let url = `https://v6.exchangerate-api.com/v6/1fbb110be34d20ad0d44e38b/latest/${fromCurrency.value}`;
        // this fetches api response and returns it with parsing into js object and in them method recieves that object
        fetch(url).then(response => response.json()).then(result => {
            let exchangeRate = result.conversion_rates[toCurrency.value]; //it stores the rate of tocurrency
            // console.log(exchangeRate); 
            let totalExchangeRate = (amountval * exchangeRate).toFixed(2);
            // console.log(totalExchangeRate);
            exchangeRateText.innerText = `${amountval} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        }).catch(() => { // if user is offline or some error occured while fetching the data.... this will run the catch function
            exchangeRateText.innerText = "Something went wrong"
        });
    } else {
        exchangeRateText.innerText = "Please enter a valid amount"
    }
}

// fun stuff
const coinLogo = document.querySelector('#coin-logo');
const exchangeLogo = document.querySelector('#exchange-logo');

coinLogo.addEventListener("click", () => {
    swapLogos();
    setTimeout(() => {
        swapLogos(); // Revert after 0.8 seconds
    }, 800);
});

exchangeLogo.addEventListener("click", () => {
    swapLogos();
    setTimeout(() => {
        swapLogos(); // Revert after 0.8 seconds
    }, 800);
});

function swapLogos() {
    coinLogo.classList.toggle("fa-coins");
    coinLogo.classList.toggle("fa-exchange-alt");

    exchangeLogo.classList.toggle("fa-exchange-alt");
    exchangeLogo.classList.toggle("fa-coins");
}









    