<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import List from '../../components/List.svelte';
    import {onMount} from "svelte";
    import {redirectToHome} from "../../utils/redirectToHome";
    import {connectedWallet} from "../../stores/connectedWallet";
    import {goto} from "$app/navigation";
    import type {TrustRelationRow} from "@circles-sdk/sdk/dist/AvatarInterface";
    import {Sdk} from "@circles-sdk/sdk";
    import {Settings} from "$lib/settings";
    import {connectedCirclesAvatar} from "../../stores/connectedCirclesAvatar";

    onMount(() => {
        redirectToHome(!$connectedCirclesAvatar);
    });

    let items: TrustRelationRow[] = [];
    $: {
        if ($connectedCirclesAvatar) {
            $connectedCirclesAvatar.getTrustRelations().then(trustRelations => {
                items = trustRelations;
            });
        }
    }

    function contactTemplate(contact: TrustRelationRow) {
        const timestamp = new Date(contact.timestamp * 1000);
        const dateTime = `${timestamp.toLocaleDateString()} - ${timestamp.toLocaleTimeString()}`;

        const inSvg = `<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />`;
        const outSvg = `<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />`;
        const mutualSvg = `<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />`;

        return `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 rounded-full">
              ${contact.relation === 'trusts' ? outSvg : contact.relation === 'trustedBy' ? inSvg : mutualSvg}
            </svg>
            <div class="ml-4">
                <p class="text-sm font-medium">${contact.objectAvatar}</p>
                <p class="text-xs text-gray-500">Added: ${dateTime}</p>
            </div>
            `;
    }

    function handleAddContact(): void {
        goto('/add-contact');
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
