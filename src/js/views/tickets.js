import currencyUI from "./currency";

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector(".tickets-sections .row");
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  renderTickets(tickets) {
    this.clearContainer();
    if (!tickets.length) {
      this.showEmptyMsg();
    }
    let fragment = ""; 
    const currency = this.getCurrencySymbol();
    tickets.forEach((ticket) => {
      const template = TicketsUI.ticketTemplate(ticket, currency);
      fragment += template;
    });
    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMessageTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMessageTemplate() {
    return `
    <div class="tickets-empty-res-msg>
    Билетов не найдено
    </div>
    `;
  }

  static ticketTemplate(ticket, currency) {
    return `
    <div class="col s12 m6">
    <div class="card ticket-card" id="${ticket.flight_number}${ticket.departure_date}">
      <div class="ticket-airline d-flex align-items-center">
        <img
          src="${ticket.airline_logo}"
          class="ticket-airline-img"
        />
        <span class="ticket-airline-name"
          >${ticket.airline_name}</span
        >
      </div>
      <div class="ticket-destination d-flex align-items-center">
        <div class="d-flex align-items-center mr-auto">
          <span class="ticket-city">${ticket.origin_name} </span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="ticket-city">${ticket.destination_name}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center">
        <span class="ticket-time-departure">${ticket.departure_at}</span>
        <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
      </div>
      <div class="ticket-additional-info">
        <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
        <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
      </div>
      <a
        class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto"
        >Add to favorites</a
      >
    </div>
  </div>
    `;
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  ticketDropdownTemplate(id, ticket, currency) {
    return `<div id="${id}" class="favorite-item  d-flex align-items-start">
                <img
                  src="${ticket.airline_logo}"
                  class="favorite-item-airline-img"
                />
                <div class="favorite-item-info d-flex flex-column">
                  <div
                    class="favorite-item-destination d-flex align-items-center"
                  >
                    <div class="d-flex align-items-center mr-auto">
                      <span class="favorite-item-city">${ticket.origin_name}</span>
                      <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="medium material-icons">flight_land</i>
                      <span class="favorite-item-city">${ticket.destination_name}</span>
                    </div>
                  </div>
                  <div class="ticket-time-price d-flex align-items-center">
                    <span class="ticket-time-departure">${ticket.departure_at}</span>
                    <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
                  </div>
                  <div class="ticket-additional-info">
                    <span class="ticket-transfers">Количество пересадок:${ticket.transfers}</span>
                    <span class="ticket-flight-number">Номер рейса:${ticket.flight_number}</span>
                  </div>
                  <a
                    class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
                    >Delete</a
                  >
                </div>
                `;
  }
}

const ticketsUI = new TicketsUI(currencyUI);
export default ticketsUI;
