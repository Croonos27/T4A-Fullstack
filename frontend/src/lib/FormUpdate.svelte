<script>
    import { visibleComponent, contactToUpdate } from "./store";
    import { RestClient } from "./restclient";

    const restClient = new RestClient();

    let name = $contactToUpdate.name;
    let birthday = $contactToUpdate.birthday;
    let size = $contactToUpdate.size;
    let address = $contactToUpdate.address;

    const buttonSaveClick = async () => {
        // neuen Kontakt erstellen
        const updatedContact = {
            id: $contactToUpdate.id,
            name: name,
            birthday: birthday,
            size: size,
            address: address,
        };

        // neuen Kontakt in Datenbank speichern
        await restClient.updateContact(updatedContact);

        // Zurück zur List
        $visibleComponent = "list";
    };

    const buttonCancelClick = () => {
        // Zurück zur List
        $visibleComponent = "list";
    };
</script>

<h2>Kontakt bearbeiten</h2>

<!-- Name -->
<div class="mb-2">
    <label class="form-label" for="inputName">Name</label>
    <input bind:value={name} class="form-control" id="inputName" type="text" />
</div>

<!-- Geburtstage-->
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


<!-- Adress -->
<div class="mb-2">
    <label class="form-label" for="inputaddress">Adresse</label>
    <input bind:value={address} class="form-control" id="inputadress" type="text" />
</div>

<!-- Buttons -->
<button on:click={buttonSaveClick} class="btn btn-success me-2"
    >Speichern</button
>
<button on:click={buttonCancelClick} class="btn btn-danger">Abbrechen</button>
