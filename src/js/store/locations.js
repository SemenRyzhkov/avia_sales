import api from "../services/apiService";
import { formatDate } from "../helpers/date";

class Locations {
  constructor(api, helpers) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = {};
    this.lastSearch = {};
    this.airlines = {};
    this.formatDate = helpers.formatDate;
  }

  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);
    console.log(response);

    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeSities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    this.airlines = this.serializeAirlines(airlines);

    return response;
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.code] = item;
      return acc;
    }, {});
  }

  getAirlineNameByCode(code) {
    return this.airlines[code].name ? this.airlines[code].name : "";
  }

  getAirlineLogoByCode(code) {
    return this.airlines[code].logo ? this.airlines[code].logo : "";
  }

  serializeCountries(countries) {
    return countries.reduce((acc, item) => {
      acc[item.code] = item;
      return acc;
    }, {});
  }

  serializeSities(cities) {
    return cities.reduce((acc, item) => {
      const countryName = this.getCountryByCode(item.country_code);
      item.name = item.name || item.name_translation.en;
      const fullName = `${item.name}, ${countryName}`;
      acc[item.code] = {
        ...item,
        fullName,
        countryName,
      };
      return acc;
    }, {});
  }

  getCountryByCode(code) {
    return this.countries[code].name;
  }

  createShortCitiesList(cities) {
    return Object.entries(cities).reduce((acc, [, value]) => {
      acc[value.fullName] = null;
      return acc;
    }, {});
  }

  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find(
      (item) => item.fullName === key
    );
    return city.code;
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = this.serializeTickets(response.data);
    console.log(this.lastSearch);
  }

  serializeTickets(tickets) {
    return Object.values(tickets).map((ticket) => {
      return {
        ...ticket,
        origin_name: this.getCityNameByCode(ticket.origin),
        destination_name: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirlineLogoByCode(ticket.airline),
        airline_name: this.getAirlineNameByCode(ticket.airline),
        departure_at: this.formatDate(ticket.departure_at, "dd MMM yyyy hh:mm"),
        departure_date: this.formatDate(ticket.departure_at, "dd"),
        return_at: this.formatDate(ticket.return_at, "dd MMM yyyy hh:mm"),

      };
    });
  }
}

const locations = new Locations(api, { formatDate });
export default locations;
