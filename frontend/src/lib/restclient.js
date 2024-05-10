export class RestClient {
    constructor() {

    }

    // CREATE
    async addContact(newContact) {
        await fetch('http://localhost:3000/kontakte/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newContact)
        });
    }

    // READ
    async getAllContacts(filter) {
        const response = await fetch(`http://localhost:3000/kontakte/?filter=${filter}`);
        const contactList = await response.json();
        return contactList;
    }

    // UPDATE
    async updateContact(contact) {
        await fetch(`http://localhost:3000/kontakte/${contact.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
    }

    // DELETE
    async deleteContact(id) {
        await fetch(`http://localhost:3000/kontakte/${id}`, {
            method: 'DELETE'
        });
    }
}