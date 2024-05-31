import { writable } from "svelte/store";

export const visibleComponent = writable('list');
// list, formNew, confirmDelete, formUpdate

export const contactToDelete = writable({
    id: '',
    name: ''
});

export const contactToUpdate = writable({
    id: '',
    name: '',
    birthday: '',
    size: '',
    address: '',
});

export const sortCategory = writable('name');
// birthday, name

export const filter = writable('all');
// all, before-2000

