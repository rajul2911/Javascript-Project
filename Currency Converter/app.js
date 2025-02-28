const BASE_URL = "https://api.exchangerate-api.com/v4/latest/";

let dropdowns = document.querySelectorAll("select");
let button = document.querySelector("button");
const fromc = document.querySelector(".From select");
const toc = document.querySelector(".To select");
const swapBtn = document.querySelector(".fa-arrow-right-arrow-left");
const msg = document.querySelector(".msg");
const amountInput = document.querySelector("input");


// Populate dropdowns with currency codes
for (let select of dropdowns) {
    for (let code in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = code;
        newoption.value = code;

        if (select.name === "From" && code === "USD") {
            newoption.setAttribute("selected", "selected");
        } else if (select.name === "To" && code === "INR") {
            newoption.setAttribute("selected", "selected");
        }
        select.appendChild(newoption);
    }

    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

// Function to update flag when currency is changed
const updateFlag = (element) => {
    let curCode = element.value;
    let countryCode = countryList[curCode];
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// Fetch exchange rate on button click
button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amtValue = amountInput.value;

    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amountInput.value = "1";
    }

    const URL = `${BASE_URL}${fromc.value}`;

    try {
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Failed to fetch exchange rates.");
        }

        let data = await response.json();
        let rate = data.rates[toc.value];

        if (!rate) {
            throw new Error(`Exchange rate for ${toc.value} not found.`);
        }

        let finalAmount = (amtValue * rate).toFixed(2);
        msg.innerText = `${amtValue} ${fromc.value} = ${finalAmount} ${toc.value}`;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        msg.innerText = "Error fetching exchange rate. Try again later.";
    }
});

// Swap currency selections when clicking the swap button
swapBtn.addEventListener("click", () => {
    let temp = fromc.value;
    fromc.value = toc.value;
    toc.value = temp;
    updateFlag(fromc);
    updateFlag(toc);
});



