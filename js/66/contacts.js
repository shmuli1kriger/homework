/* global $*/

const contactsTable = $('#contactsTable tbody');
const firstInput = $('#first');
const lastInput = $('#last');
const emailInput = $('#email');
const phoneInput = $('#phone');
const addContactForm = $('#addContact');
const addContactButton = $('#addContactButton');
let contacts = [];

function hideAddContactForm() {
    addContactForm.hide();
    //addContactForm.reset();
    //addContactForm[0].reset();
    addContactForm.trigger('reset');
    addContactButton.show();
}

export default function addContact(newContact) {
    if (!contacts.length) {
        //contactsTable.html('');
        contactsTable.empty();
    }
    //if (newContact?.first.length > 0 && newContact?.last.length > 0) {
        contacts.push(newContact);
    //}
    const row = $(`<tr>
                    <td>${newContact.first}</td>
                    <td>${newContact.last}</td>
                    <td>${newContact.email}</td>
                    <td>${newContact.phone}</td>
                    <td><button>delete</button></td>
                </tr>`);
    contactsTable.append(row);

    row.find('button').click(() => {
        row.remove();

        contacts = contacts.filter(c => c !== newContact);

        if (!contacts.length) {
            contactsTable.html (`
        <tr>
            <td colspan="5">no contacts loaded</td>
        </tr>
        `);}
    });

    hideAddContactForm();
}

addContactForm.on('submit', e => {
    e.preventDefault();
    const newContact = {
        first: firstInput.val(),
        last: lastInput.val(),
        email: emailInput.val(),
        phone: phoneInput.val()
    };
    addContact(newContact);
    
});
addContactButton.click(() => {
    addContactForm.show();
    addContactButton.hide();
});
$('#cancel').click(hideAddContactForm);