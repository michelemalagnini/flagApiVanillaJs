const countryEl = document.getElementById("main-body");
const resultCountrySearch = document.getElementById("resultCountrySearch");
const showAllContries = document.getElementById("showAllContries");
const countryNameInp = document.getElementById("countryNameInp");
const contrieSearchBtn = document.getElementById("contrieSearchBtn");
const countrySelectTag = document.getElementById("countrySelectTag");
const contrieSearchBtnClear = document.getElementById("contrieSearchBtnClear");

const getAllCountryes = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    data.map((el) => showCountryes(el));
  } catch (err) {
    console.log(err);
    errorMessage(
      "Error there is something wrong the page will be update automatically!"
    );
  }
};

const showCountryes = (data) => {
  const country = document.createElement("div");
  country.classList.add("card");
  country.innerHTML = `
    <img src="${data.flags.png}" alt="${data.name.common}" style="width: 100%" />
            <div class="container">
              <h4 class="stateName"><b>${data.name.common}</b></h4>
              <p>Capital: ${data.capital}</p>
            </div>
    `;
  countryEl.appendChild(country);
};

showAllContries.addEventListener("click", () => {
  resultCountrySearch.innerHTML = "";
  countryNameInp.value = "";
  countryNameInp.disabled = true;
  contrieSearchBtn.disabled = true;
  contrieSearchBtnClear.disabled = true;

  getAllCountryes();
  if (countryEl.style.display === "flex") {
    showAllContries.innerText = "Show";
    countryEl.style.display = "none";
    countryNameInp.disabled = false;
    contrieSearchBtn.disabled = false;
    contrieSearchBtnClear.disabled = false;
  } else {
    showAllContries.innerText = "Disappear";
    countryEl.style.display = "flex";
    countryNameInp.disabled = true;
    contrieSearchBtn.disabled = true;
    contrieSearchBtnClear.disabled = true;
  }
});

contrieSearchBtn.addEventListener("click", () => {
  if (resultCountrySearch.innerHTML) {
    resultCountrySearch.innerHTML = "";
  }
  resultCountrySearch.style.display = "block";
  const name = countryNameInp.value;
  const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
  getSearchCountryes(url);
});

const getSearchCountryes = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    showCountry(data[0]);
  } catch (err) {
    console.log(err);
    errorMessage(
      "Error the country you are looking for there isn't the page will be update automatically!"
    );
  }
};

contrieSearchBtnClear.addEventListener("click", () => {
  resultCountrySearch.innerHTML = "";
});

const showCountry = (data) => {
  console.log(data.name.common);
  const country = document.createElement("div");
  country.classList.add("cardSingle");
  country.innerHTML = `
      <img src="${data.flags.png}" alt="${data.name.common}" style="width: 100%" />
              <div class="container">
                <h4><b>${data.name.common}</b></h4>
                <p>Capital: ${data.capital}</p>
              </div>
      `;
  resultCountrySearch.appendChild(country);
};

const getAllCountryName = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    let names = data.map((el) => el.name.common);
    for (var i = 0; i < names.length; i++) {
      let option = document.createElement("option");
      option.text = names[i];
      option.value = names[i];
      option.classList.add("state");
      //   countrySelectTag.add(option);
    }
  } catch (err) {
    console.log(err);
    errorMessage();
  }
};

const errorMessage = (message) => {
  const country = document.createElement("div");
  country.classList.add("cardError");
  country.innerHTML = `
    <h1>${message}</h1>
    `;
  countryEl.appendChild(country);
  setTimeout(function () {
    window.location.reload();
  }, 3000);
};
getAllCountryName();
