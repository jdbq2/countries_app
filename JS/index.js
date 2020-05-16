(async function load() {
  const URL =
    "https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;languages;region;population;area;flag;latlng;subregion";
  const $america_container = document.getElementById("Americas");
  const $europe_container = document.getElementById("Europe");
  const $asia_container = document.getElementById("Asia");
  const $oceania_container = document.getElementById("Oceania");
  const $africa_container = document.getElementById("Africa");
  const $side_list_container = document.getElementById(
    "country-list-container"
  );
  const $other_container = document.getElementById("Other_region");
  const $search_result_container = document.getElementById(
    "search-result-container"
  );
  const $main_content = document.getElementById("main-content");
  const $search_form = document.getElementById("search-form");
  const $search_Input = document.getElementById("search-input");
  const $submit_button = document.getElementById("submit-button");
  const $body = document.getElementById("body");

  async function getData(url) {
    const countries_Response = await fetch(url);
    const countries_Data = await countries_Response.json();
    console.log(countries_Data);
    return countries_Data;
  }

  const all_Countries_Data = await getData(URL);

  $search_form.addEventListener("submit", render_search_bar);

  async function render_search_bar(event) {
    event.preventDefault();

    const data = new FormData($search_form);
    try {
      const SEARCH_NAME = find_By_Name(all_Countries_Data, data.get(`name`));
      console.log(SEARCH_NAME);
      const HTML_COUNTRY_String = list_Template(
        SEARCH_NAME.flag,
        SEARCH_NAME.name
      );
      const country_Element = print_Template(HTML_COUNTRY_String);
      show_countries_Modal(country_Element);
    } catch (error) {
      alert("We can´t find that country, try again please");
    }
    $search_form.reset();
  }
  function main_Template(FLAG, NAME) {
    return `<div data-name="${NAME}" class="general-country-container">
            <figure class="country-flag-container">
              <img src="${FLAG}" alt="country name flag" />
            </figure>
            <h3 class="country-name">${NAME}</h2>
          </div>`;
  }
  function list_Template(FLAG, NAME) {
    return `<li data-name="${NAME}" class="list-item"><img src="${FLAG}" alt="country-flag"><a>${NAME}</a></li>`;
  }
  function search_Modal_Template(
    NAME,
    COR1,
    COR2,
    FLAG,
    CAPITAL,
    LENGUAGE,
    CURRENCY,
    SYMBOL,
    POPULATION,
    AREA,
    SUBREGION
  ) {
    return ` <div class="info123">
    <h2 class="modal-country-name">${NAME}</h2>
        <div class="info-wraper">
          <div class="mapouter">
            <div class="gmap_canvas">
              <iframe
                width="100%"
                height="100%"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=${COR1}%2C%20${COR2}&t=k&z=5&ie=UTF8&iwloc=&output=embed"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
              ></iframe
              ><a href="https://google-map-generator.com"
                >google map generator</a
              >
            </div>
          </div>
          <div class="country-details">
            <figure class="modal-country-flag-container">
              <img
                src="${FLAG}"
                alt="${NAME} flag"
              />
            </figure>
            <ul class="country-details-container">
              <li class="country-details-item">
                <strong>Capital:</strong> ${CAPITAL}
              </li>
              <li class="country-details-item">
                <strong>Lenguage Name:</strong> ${LENGUAGE}
              </li>
              <li class="country-details-item">
                <strong>Currency Name:</strong> ${CURRENCY}
              </li>
              <li class="country-details-item">
                <strong>Currency Symbol:</strong> ${SYMBOL}
              </li>
              <li class="country-details-item">
                <strong>Population:</strong> ${POPULATION}
              </li>
              <li class="country-details-item">
                <strong>Area (km2):</strong> ${AREA}
              </li>
              <li class="country-details-item">
                <strong>Subregion:</strong> ${SUBREGION}
              </li>
            </ul>
          </div>
        </div>
        <button id="close-button" class="close-button">Cerrar</button>
        </div>`;
  }
  function print_Template(HTML_Country_String) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTML_Country_String;
    return html.body.children[0];
  }
  function clear_List(container) {
    const myNode = container;
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
  }
  function country_Click_Listener(country_Element) {
    country_Element.addEventListener("click", () => {
      show_countries_Modal(country_Element);
    });
  }
  function close_Event_Listener() {
    $body.classList.remove(`position-fixed`);
    $search_result_container.classList.remove("display");
    $search_result_container.children[0].remove();
    $side_list_container.classList.remove("no-pointer-events");
    $main_content.classList.remove("no-pointer-events");
    $(`#search-form`).unbind(`keydown`);
  }
  function show_countries_Modal(country_Element) {
    $body.classList.add(`position-fixed`);
    $search_result_container.classList.add(`display`);
    $side_list_container.classList.add("no-pointer-events");
    $main_content.classList.add("no-pointer-events");
    $(`#search-form`).keydown((e) => {
      e.preventDefault();
    });
    const id = country_Element.dataset.name;
    const modal_country = find_By_Name(all_Countries_Data, id);
    const CURRENCY = modal_country.currencies[0].name;
    const SYMBOL = modal_country.currencies[0].symbol;
    const NAME = modal_country.name;
    const CAPITAL = modal_country.capital;
    const FLAG = modal_country.flag;
    const POPULATION = modal_country.population.toLocaleString();
    const LENGUAGE = modal_country.languages[0].name;
    if (modal_country.area !== undefined) {
      var AREA = modal_country.area.toLocaleString();
    }
    const SUBREGION = modal_country.subregion;
    const COR1 = modal_country.latlng[0];
    const COR2 = modal_country.latlng[1];
    const HTML_MODAL_TEMPLATE = search_Modal_Template(
      NAME,
      COR1,
      COR2,
      FLAG,
      CAPITAL,
      LENGUAGE,
      CURRENCY,
      SYMBOL,
      POPULATION,
      AREA,
      SUBREGION
    );
    const modal_Element = print_Template(HTML_MODAL_TEMPLATE);
    $search_result_container.append(modal_Element);
    const $close_Button = document.getElementById("close-button");
    $close_Button.addEventListener("click", close_Event_Listener);
  }
  function find_By_Name(list, id) {
    return list.find(
      (country) => country.name.toLowerCase() === id.toLowerCase()
    );
  }

  function render_Countries_List(list, container) {
    list.forEach((country) => {
      const NAME = country.name;
      const FLAG = country.flag;

      const HTML_COUNTRY_String = list_Template(FLAG, NAME);
      const country_Element = print_Template(HTML_COUNTRY_String);
      container.append(country_Element);
      country_Click_Listener(country_Element);
    });
  }
  function render_Country_Cards(list, container) {
    list.forEach((country) => {
      const NAME = country.name;
      const FLAG = country.flag;

      const HTML_COUNTRY_String = main_Template(FLAG, NAME);
      const country_Element = print_Template(HTML_COUNTRY_String);
      container.append(country_Element);
      country_Click_Listener(country_Element);
    });
  }
  const americas = all_Countries_Data.filter(
    (country) => country.region === "Americas"
  );
  render_Country_Cards(americas, $america_container);
  const europe = all_Countries_Data.filter(
    (country) => country.region === "Europe"
  );
  render_Country_Cards(europe, $europe_container);
  const asia = all_Countries_Data.filter(
    (country) => country.region === "Asia"
  );
  render_Country_Cards(asia, $asia_container);
  const oceania = all_Countries_Data.filter(
    (country) => country.region === "Oceania"
  );
  render_Country_Cards(oceania, $oceania_container);
  const africa = all_Countries_Data.filter(
    (country) => country.region === "Africa"
  );
  render_Country_Cards(africa, $africa_container);
  const other = all_Countries_Data.filter((country) => {
    return (
      country.region !== "Americas" &&
      country.region !== "Europe" &&
      country.region !== "Asia" &&
      country.region !== "Oceania" &&
      country.region !== "Africa"
    );
  });
  render_Country_Cards(other, $other_container);
  render_Countries_List(all_Countries_Data, $side_list_container);

  document.querySelector("select").addEventListener("change", function (evt) {
    clear_List($side_list_container);
    switch (evt.target.value) {
      case "alphabetical":
        const alphabetical = all_Countries_Data.sort(function (a, b) {
          if (b.name > a.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        return render_Countries_List(alphabetical, $side_list_container);
      case "big":
        const pop = all_Countries_Data.sort(function (a, b) {
          return b.population - a.population;
        });
        const big_Countries = all_Countries_Data.sort(function (a, b) {
          return b.area - a.area;
        });
        return render_Countries_List(big_Countries, $side_list_container);
      case "populated":
        const populated = all_Countries_Data.sort(function (a, b) {
          return b.population - a.population;
        });
        return render_Countries_List(populated, $side_list_container);
      case "english":
        const english = all_Countries_Data.filter((country) => {
          return country.languages[0].name === "English";
        });
        return render_Countries_List(english, $side_list_container);
      case "spanish":
        const spanish = all_Countries_Data.filter((country) => {
          return country.languages[0].name === "Spanish";
        });
        return render_Countries_List(spanish, $side_list_container);
      case "french":
        const french = all_Countries_Data.filter((country) => {
          return country.languages[0].name === "French";
        });
        return render_Countries_List(french, $side_list_container);
      case "portuguese":
        const portuguese = all_Countries_Data.filter((country) => {
          return country.languages[0].name === "Portuguese";
        });
        return render_Countries_List(portuguese, $side_list_container);
      case "other":
        const other = all_Countries_Data.filter((country) => {
          return (
            country.languages[0].name !== "Portuguese" &&
            country.languages[0].name !== "French" &&
            country.languages[0].name !== "Spanish" &&
            country.languages[0].name !== "English"
          );
        });
        return render_Countries_List(other, $side_list_container);
    }
  });
  const countries_Name_Array = [];

  for (let i = 0; i < all_Countries_Data.length; i++) {
    countries_Name_Array.push(all_Countries_Data[i].name);
  }

  autocomplete($search_Input, countries_Name_Array);
})();
