<script>
    import { onMount } from "svelte";
    import { RestClient } from "./restclient";
    import {
        visibleComponent,
        contactToDelete,
        contactToUpdate,
        sortCategory,
        filter,
    } from "./store";

    const restClient = new RestClient();
    let contactList = [];

    const sortList = (category) => {
        switch (category) {
            case "birthday":
                // nach Alter sortieren
                contactList.sort((contact1, contact2) =>
                    contact2.birthday.localeCompare(contact1.birthday),
                );
                break;
            default:
                // nach Name sortieren
                contactList.sort((contact1, contact2) =>
                    contact1.name.localeCompare(contact2.name),
                );
        }
        contactList = contactList;
    };

    // Wird jedesmal aufgerufen,
    // wenn sich $sortCategory ändert
    $: sortList($sortCategory);

    // Wird jedesmal aufgerufen,
    // wenn sich $filter ändert
    $: getFilteredContacts($filter);

    const getFilteredContacts = async (filter) => {
        contactList = await restClient.getAllContacts(filter);
    };

    // Wir jedesmal aufgerufen,
    // wenn die Komponente List.svelte
    // angezeigt wird
    onMount(async () => {
        // Liste vom Server holen
        contactList = await restClient.getAllContacts($filter);

        // Liste sortieren
        sortList($sortCategory);
    });

    const getLocalDate = (text) => {
        const date = new Date(text);
        return date.toLocaleDateString();
    };

    const buttonNewClick = () => {
        // Eingabeformular
        // für neuen Kontakt anzeigen
        $visibleComponent = "formNew";
    };

    const buttonDeleteClick = (contact) => {
        // Kontakt speichern
        $contactToDelete = contact;

        // Bestätigungsformular
        // zum Löschen
        // anzeigen
        $visibleComponent = "confirmDelete";
    };

    const buttonUpdateClick = (contact) => {
        // Kontakt speichern
        $contactToUpdate = contact;

        // Formular zum Bearbeiten anzeigen
        $visibleComponent = "formUpdate";
    };
</script>

<h2>Alle Kontakte</h2>

<!-- Filter -->
<div class="border p-2 mb-2">
    <h4>Filtern</h4>
    <select class="form-select" bind:value={$filter}>
        <option value="all">Alle</option>
        <option value="after-2000">nach 2000 geboren</option>
        <option value="size">Größe</option>
    </select>
</div>

<!-- Sortieren-->
<div class="border p-2">
    <h4>Sortieren</h4>
    <div class="form-check">
        <input
            bind:group={$sortCategory}
            class="form-check-input"
            type="radio"
            name="sortieren"
            id="radioName"
            value="name"
        />
        <label class="form-check-label" for="radioName">nach Name</label>
    </div>
    <div class="form-check">
        <input
            bind:group={$sortCategory}
            class="form-check-input"
            type="radio"
            name="sortieren"
            id="radioAlter"
            value="birthday"
        />
        <label class="form-check-label" for="radioAlter">nach Alter</label>
    </div>
</div>

<!-- Tabelle -->
<table class="table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Geburtstag</th>
            <th>T-Shirt Größe</th>
            <th>Adresse</th>
            <th>-</th>
        </tr>
    </thead>
    <tbody>
        {#each contactList as contact}
            <tr>
                <td>{contact.name}</td>
                <td>{getLocalDate(contact.birthday)}</td>
                <td>{contact.size}</td>
                <td>{contact.address}</td>
                <td>
                    <button
                        on:click={() => {
                            buttonDeleteClick(contact);
                        }}
                        class="btn btn-danger"
                    >
                        -
                    </button>
                    <button
                        on:click={() => {
                            buttonUpdateClick(contact);
                        }}
                        class="btn btn-primary">Bearbeiten</button
                    >
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<!-- Button Neu-->
<button on:click={buttonNewClick} class="btn btn-primary">
    Neuen Kontakt erstellen
</button>
