<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import List from '../../components/List.svelte';
    import {onMount} from "svelte";
    import {isCirclesWallet} from "../../stores/isCirclesWallet";
    import {redirectToHome} from "../../utils/redirectToHome";

    onMount(() => {
        redirectToHome(!$isCirclesWallet);
    });

    const items = [
        {name: 'Alice', dateAdded: '2024-04-01', imgSrc: 'https://via.placeholder.com/50'},
        {name: '0x123...456', dateAdded: '2024-03-15', imgSrc: 'https://via.placeholder.com/50'},
        {name: 'Bob', dateAdded: '2024-05-10', imgSrc: 'https://via.placeholder.com/50'}
    ];

    function contactTemplate(contact) {
        return `
            <img src="${contact.imgSrc}" alt="Contact Image" class="w-12 h-12 rounded-full">
            <div class="ml-4">
                <p class="text-sm font-medium">${contact.name}</p>
                <p class="text-xs text-gray-500">Added: ${contact.dateAdded}</p>
            </div>
        `;
    }

    function handleAddContact(): void {
        console.log('Add Contact button clicked');
        // Add your logic to add a new contact or navigate to a contact creation form
    }
</script>

<PageFrame title="Contacts">
    <div class="flex justify-between items-center mb-4">
        <button class="bg-blue-500 text-white py-2 px-4 rounded-md" on:click={handleAddContact}>
            Add Contact
        </button>
    </div>
    <List {items} template={contactTemplate}/>
</PageFrame>
