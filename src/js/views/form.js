import {
  getAutocompleteInstance,
  getDatePickerInstance,
} from "../plugins/materialize";

class FormUI {
  constructor(autocompleteInstance, datePickerInstance) {
    this._form = document.forms["locationControls"];
    this.origin = document.getElementById("autocomplete-origin");
    this.destination = document.getElementById("autocomplete-destination");
    this.departDatepicker = document.getElementById("datepicker-depart");
    this.returnDatepicker = document.getElementById("datepicker-return");
    this.originAutocomplete = autocompleteInstance(this.origin);
    this.destinationAutocomplete = autocompleteInstance(this.destination);
    this.departDatepickerInst = datePickerInstance(this.departDatepicker);
    this.returnDatepickerInst = datePickerInstance(this.returnDatepicker);
  }

  get form() {
    return this._form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.departDatepickerInst.toString();
  }

  get returnDateValue() {
    return this.returnDatepickerInst.toString();
  }

  setAutocompleteData(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;
