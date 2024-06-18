const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

const dropdowns = document.querySelectorAll(".dropdown select");
const image = document.querySelector("img");
const button = document.querySelector("button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", ()=>{
    updateExchangeRate();
})


for(let select of dropdowns){  //from and To dropdown 
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const fetchJSON = async(endPoint) =>{
    const URL = `${BASE_URL}${endPoint}`;
    let response = await fetch(URL);
    if(!response.ok){
        throw new Error(`HTTP Error! status = ${response.status}`);
    }
    return response.json();
}

button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async() =>{
    let amount = document.querySelector("input");
    let amtVal = amount.value;
    if(amtVal=="" || amtVal<0){
        amtVal = 1;
        amount.value = '1';
    };
    let JSON = await fetchJSON(`/currencies/${fromCurr.value.toLowerCase()}.json`);
    rate = JSON[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = rate * amount.value;
    msg.innerHTML = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}