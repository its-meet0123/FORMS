const BASE_URL = `https://latest.currency-api.pages.dev/v1/currencies`;

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");

for(select of dropdowns){
    for(currCode in countryList){
        //console.log(currCode);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
        select.addEventListener("change",(evt) => {
            updateFlag(evt.target);
            successInfo();
        });
        
    }
}

const updateFlag = (element) => {
    //console.log(countryList[currCode]);
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const  exchangeRate = async() =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    //console.log(amtVal);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    //console.log(fromCurr.value);
    let response = await fetch(URL);
    let data = await response.json(); 
    //console.log(data);
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtVal*rate;
    let successMsg = document.getElementById("success"); 
    

    successMsg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
} 

const successInfo = async()=> {
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let info = document.getElementById("info");
    info.innerText = `1 ${fromCurr.value} = ${rate} ${toCurr.value}`;
}


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    exchangeRate();
});

window.addEventListener("load",(evt) =>{
    successInfo();
});



