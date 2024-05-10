<script>
    import { visibleComponent } from "./store";
    import { RestClient } from "./restclient";

    const restClient = new RestClient();

    let name = "Moni Musterfrau";
    let birthday = "2000-01-01";
    let size = 'XL'

    const buttonSaveClick = async () => {
        // neuen Kontakt erstellen
        const newContact = {
            name: name,
            birthday: birthday,
            size: size,
        };

        // neuen Kontakt in Datenbank speichern
        await restClient.addContact(newContact);

        // Zurück zur List
        $visibleComponent = "list";
    };

    const buttonCancelClick = () => {
        // Zurück zur List
        $visibleComponent = "list";
    };
</script>

<h2>Neuer Kontakt</h2>

<!-- Name -->
<div class="mb-2">
    <label class="form-label" for="inputName">Name</label>
    <input bind:value={name} class="form-control" id="inputName" type="text" />
</div>

<!-- Geburtstage -->
<div class="mb-2">
    <label class="form-label" for="inputBirthday">Geburtstag</label>
    <input
        bind:value={birthday}
        class="form-control"
        type="date"
        id="inputBirthday"
    />
</div>

<!-- Size -->
<div class="mb-2">
    <label class="form-label" for="inputSize">Größe</label>
    
    <select class="form-select" bind:value={size}>
    <option>S</option>
    <option>M</option>
    <option>L</option>
    <option>XL</option>
    </select>
</div>


<!-- Buttons -->
<button on:click={buttonSaveClick} class="btn btn-success me-2"
    >Speichern</button
>
<button on:click={buttonCancelClick} class="btn btn-danger">Abbrechen</button>
