import locations from "./store/locations";
import "../css/style.css";
import "./plugins";
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";
import storage from "./store/storage";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const form = formUI.form;
  const ticketContainer = document.querySelector(".tickets-sections .row");
  const dropDownContainer = document.querySelector(
    ".favorites .dropdown-content"
  );

  //Events

  dropDownContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-favorite")) {
      e.preventDefault();
      const card = e.target.closest(".favorite-item");
      onDeleteFavoriteHandler(card);
    }
  });
  ticketContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-favorite")) {
      const card = e.target.closest(".ticket-card");
      onAddFavoriteHandler(card);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  //Handlers

  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  function onDeleteFavoriteHandler(card) {
    const id = card.id;
    storage.deleteTicket(id);
    dropDownContainer.removeChild(card);
  }

  function onAddFavoriteHandler(card) {
    const idCard = Number(card.id);
    const ticket = locations.lastSearch.find(
      (item) => Number(item.flight_number + item.departure_date) === idCard
    );
    const id = storage.addTicket(ticket);
    if (!id) return;
    const currency = ticketsUI.getCurrencySymbol();
    const ticketTemplate = ticketsUI.ticketDropdownTemplate(
      id,
      ticket,
      currency
    );
    dropDownContainer.insertAdjacentHTML("afterbegin", ticketTemplate);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });
    ticketsUI.renderTickets(locations.lastSearch);
  }
});
