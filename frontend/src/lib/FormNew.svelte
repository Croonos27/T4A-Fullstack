<script>
    import { visibleComponent } from "./store";
    import { RestClient } from "./restclient";

    const restClient = new RestClient();

    let name = "Moni Musterfrau";
    let birthday = "2000-01-01";
    let size = 'XL'
    let address = "Musterstraße: 05"
    let konto = 'DE02700202700010108669'
    let animal = 'dog'
    let sex = 'not defined'

    const buttonSaveClick = async () => {
        // neuen Kontakt erstellen
        const newContact = {
            name: name,
            birthday: birthday,
            size: size,
            address: address,
            konto : konto,
            animal : animal,
            sex : sex,
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


<!-- Adresse -->
<div class="mb-2">
    <label class="form-label" for="inputaddress">Adresse</label>
    <input bind:value={address} class="form-control" id="inputaddress" type="text" />
</div>


<!-- Kontonummer -->
<div class="mb-2">
    <label class="form-label" for="inputkonto">Kontonummer</label>
    <input bind:value={konto} class="form-control" id="inputkonto" type="text" />
</div>

<!--animal -->
<div class="mb-2">
    <label class="form-label" for="select-animal">Lieblingstier</label>
    <select class="form-select" id="select-animal" bind:value={animal}>
        <option value="dog">Hund 🐕‍🦺</option>
        <option value="cat">Katze 😹</option>
        <option value="mouse">Maus 🐁</option>
    </select>
</div>

<!--sex -->
<div class="mb-2">
    <label class="form-label" for="select-sex">Geschlecht</label>
    <select class="form-select" id="select-sex" bind:value={sex}>
        <option value="man">Mann ♂️</option>
        <option value="women">Frau ♀️</option>
        <option value="divers">Anders 🤷</option>
        <option value="not defined">Bitte Geschlecht auswählen</option>
    </select>
</div>

<!-- Buttons -->
<button on:click={buttonSaveClick} class="btn btn-success me-2"
    >Speichern</button
>
<button on:click={buttonCancelClick} class="btn btn-danger">Abbrechen</button>
