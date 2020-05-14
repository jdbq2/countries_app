(async function load() {
  const URL =
    "https://restcountries.eu/rest/v2/all?fields=name;capital;currencies;languages;region;population;area;flag";
  const $america_container = document.getElementById("Americas");
  const $europe_container = document.getElementById("Europe");
  const $asia_container = document.getElementById("Asia");
  const $oceania_container = document.getElementById("Oceania");
  const $africa_container = document.getElementById("Africa");
  const $side_list_container = document.getElementById(
    "country-list-container"
  );
  const $other_container = document.getElementById("Other_region");

  async function getData(url) {
    const countries_Response = await fetch(url);
    const countries_Data = await countries_Response.json();
    return countries_Data;
  }

  const all_Countries_Data = await getData(URL);

  function main_Template(FLAG, NAME) {
    return `<div class="general-country-container">
            <figure class="country-flag-container">
              <img src="${FLAG}" alt="country name flag" />
            </figure>
            <h3 class="country-name">${NAME}</h2>
          </div>`;
  }
  function list_Template(FLAG, NAME) {
    return `<li class="list-item"><img src="${FLAG}" alt="country-flag"><a href="#">${NAME}</a></li>`;
  }
  function render_Countries_List(list, container) {
    list.forEach((country) => {
      const CURRENCIES = country.currencies[0].name;
      const NAME = country.name;
      const CAPITAL = country.capital;
      const FLAG = country.flag;
      const POPULATION = country.population;
      const LENGUAGE = country.languages[0].name;
      const AREA = country.area;
      const REGION = country.region;

      const HTML_COUNTRY_String = list_Template(FLAG, NAME);
      const country_Element = print_Template(HTML_COUNTRY_String);
      container.append(country_Element);
      //   friend_Click_Listener(friend_Element);
    });
  }
  function render_Country_Cards(list, container) {
    list.forEach((country) => {
      const CURRENCIES = country.currencies[0].name;
      const NAME = country.name;
      const CAPITAL = country.capital;
      const FLAG = country.flag;
      const POPULATION = country.population;
      const LENGUAGE = country.languages[0].name;
      const AREA = country.area;
      const REGION = country.region;

      const HTML_COUNTRY_String = main_Template(FLAG, NAME);
      const country_Element = print_Template(HTML_COUNTRY_String);
      container.append(country_Element);
      //   friend_Click_Listener(friend_Element);
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
  function print_Template(HTML_Country_String) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTML_Country_String;
    return html.body.children[0];
  }
  function clear_List() {
    const myNode = $side_list_container;
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
  }

  render_Countries_List(all_Countries_Data, $side_list_container);

  document.querySelector("select").addEventListener("change", function (evt) {
    clear_List();
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
})();
