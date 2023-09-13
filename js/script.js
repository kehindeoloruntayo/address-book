class AddressBook {
  constructor() {
    this.contacts = {};
    this.currentId = 0;
  }

  addContact(contact) {
    contact.id = this.assignId();
    this.contacts[contact.id] = contact;
  }

  assignId = () => {
    this.currentId += 1;
    return this.currentId;
  };

  findContact(id) {
    if (this.contacts[id] !== undefined) {
      return this.contacts[id];
    }
    return false;
  }

  deleteContact(id) {
    if (this.contacts[id] === undefined) {
      return false;
    }
    delete this.contacts[id];
    return true;
  }
}

class Contact {
  constructor(fullName, homeAddress, emailAddress, mobileNumber) {
    this.fullName = fullName;
    this.homeAddress = homeAddress;
    this.emailAddress = emailAddress;
    this.mobileNumber = mobileNumber;
  }

  fullName = () => {
    return `${this.fullName}`;
  };
}

const addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  const contactsList = $("#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach((key) => {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += `<li id=${contact.id}>${contact.fullName}</li>`;
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show(1000);
  $(".full-name").html(contact.fullName);
  $(".home-address").html(contact.homeAddress);
  $(".email-address").html(contact.emailAddress);
  $(".mobile-number").html(contact.mobileNumber);
  const buttons = $("#buttons");
  buttons.empty();
  buttons.append(`<button class='delete-contact' id=${contact.id}>Delete</button>`);
}

function attachContactListeners() {
  $("#contacts").on("click", "li", function () {
    showContact(this.id);
  });

  $("#buttons").on("click", ".delete-contact", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function () {
  attachContactListeners();
  $("#new-contact").submit(function (event) {
    event.preventDefault();
    const inputtedFullName = $("#fullname").val();
    const inputtedAddress = $("#address").val();
    const inputtedEmail = $("#email").val();
    const inputtedMobileNumber = $("#number").val();

    $("#fullname").val("");
    $("#address").val("");
    $("#email").val("");
    $("#number").val("");

    const newContact = new Contact(inputtedFullName, inputtedAddress, inputtedEmail, inputtedMobileNumber);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
