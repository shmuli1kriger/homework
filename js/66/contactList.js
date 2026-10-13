import addContact from "./contacts.js";
let contactsList;
try {
    const r = await fetch('contactList.json');
    if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText}`);
    }
    contactsList = await r.json();
    console.log(contactsList);
} catch(e) {
    console.error(e);
}

contactsList.forEach(contact => {
    addContact(contact);
});