const argv = require("yargs").argv;

const contacts = require("./contacts");
const asyncHandler = require("./tools/asyncHandler");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      asyncHandler(contacts.displayContacts());
      break;

    case "get":
      asyncHandler(contacts.displayContactById(id));
      break;

    case "add":
      asyncHandler(contacts.addContact(name, email, phone));
      break;

    case "remove":
      asyncHandler(contacts.removeContact(id));
      break;

    default:
      console.warn("Unknown action type!");
  }
}

invokeAction(argv);
