class Storage {
  constructor() {
    this.tickets = {};
    this.id = 1;
  }

  get allTickets() {
    return this.tickets;
  }

  addTicket(ticket) {
    const t = Object.values(this.tickets).find(
      (item) =>
        item.flight_number === ticket.flight_number &&
        item.departure_date === ticket.departure_date
    );
    console.log(t);
    if (t) return;
    const id = this.id++;
    this.tickets[id] = ticket;
    return id;
  }

  deleteTicket(id) {
    delete this.tickets[id];
  }

  getTicket(id) {}
}

const storage = new Storage();
export default storage;
