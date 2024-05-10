<script>
  import ConfirmDelete from "./lib/ConfirmDelete.svelte";
  import Footer from "./lib/Footer.svelte";
  import FormNew from "./lib/FormNew.svelte";
  import FormUpdate from "./lib/FormUpdate.svelte";
  import Header from "./lib/Header.svelte";
  import List from "./lib/List.svelte";

  import { visibleComponent } from "./lib/store";
  // list, formNew
</script>

<div class="container">
  <Header />
  <main class="p-2 border">
    {#if $visibleComponent === "list"}
      <List />
    {/if}
    {#if $visibleComponent === "formNew"}
      <FormNew />
    {/if}
    {#if $visibleComponent === "confirmDelete"}
      <ConfirmDelete />
    {/if}
    {#if $visibleComponent === "formUpdate"}
      <FormUpdate />
    {/if}
  </main>
  <Footer />
</div>
