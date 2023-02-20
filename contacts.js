const fs = require("fs/promises");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

class ContactsOperations {
  constructor(contactsPath) {
    this.contactsPath = contactsPath;
  }

  async readContacts() {
    return fs.readFile(this.contactsPath, "utf-8");
  }

  async displayContacts() {
    const table = [];
    const contacts = await this.readContacts();
    JSON.parse(contacts).map(({ id, name, email, phone }) => {
      table.push({ id, name, email, phone });
    });
    console.log("All contacts from database:");
    console.table(table);
  }

  async displayContactById(contactId) {
    const contactsList = JSON.parse(await this.readContacts());
    const contactById = contactsList.find(
      (item) => item.id === String(contactId)
    );
    if (!contactById) {
      console.log("Can't find any contact by id...");
      return;
    }
    console.log("Contact from database with your id:");
    console.log(contactById);
  }

  async addContact(name, email, phone) {
    const contactsList = JSON.parse(await this.readContacts());
    const newContact = { id: uuidv4(), name, email, phone };
    contactsList.push(newContact);
    fs.writeFile(this.contactsPath, JSON.stringify(contactsList, null, 2));
    console.log("Contact was successfully added to database!");
  }

  async removeContact(contactId) {
    const contactsList = JSON.parse(await this.readContacts());
    const contactById = contactsList.find(
      (item) => item.id === String(contactId)
    );
    const contactIndex = contactsList.indexOf(contactById);
    if (contactIndex < 0) {
      console.log("Can't find any contact by id...");
      return;
    }
    contactsList.splice(contactIndex, 1);
    fs.writeFile(this.contactsPath, JSON.stringify(contactsList, null, 2));
    console.log("Contact was successfully removed from database!");
  }
}

const contacts = new ContactsOperations(contactsPath);

module.exports = contacts;
