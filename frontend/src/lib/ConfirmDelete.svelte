<script>
    import { RestClient } from "./restclient";
    import { visibleComponent, contactToDelete } from "./store";

    const buttonDeleteClick = async () => {
        // Kontakt löschen
        const restClient = new RestClient();
        await restClient.deleteContact($contactToDelete.id);

        // Liste anzeigen
        $visibleComponent = "list";
    };

    const buttonCancelClick = () => {
        // Liste anzeigen
        $visibleComponent = "list";
    };
</script>

<h2>Kontakt löschen</h2>
<p>
    Wollen Sie den Kontakt <strong>{$contactToDelete.name}</strong> wirklich löschen?
</p>
<button on:click={buttonDeleteClick} class="btn btn-danger">Löschen</button>
<button on:click={buttonCancelClick} class="btn btn-secondary">
    Abbrechen
</button>
