<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import List from '../../components/List.svelte';
    import {onMount} from "svelte";
    import {isCirclesWallet} from "../../stores/isCirclesWallet";
    import {redirectToHome} from "../../utils/redirectToHome";
    import {CirclesData, CirclesQuery, CirclesRpc, type TrustListRow} from "@circles-sdk/data";
    import {connectedWallet} from "../../stores/connectedWallet";
    import {Settings} from "$lib/settings";
    import {goto} from "$app/navigation";

    onMount(() => {
        redirectToHome(!$isCirclesWallet);
    });

    let items: TrustListRow[] = [];
    let query: CirclesQuery<TrustListRow> | null = null;

    $: {
        if (!$connectedWallet || !$isCirclesWallet) {
            items = [];
            query = null;
        } else {
            const circlesData = new CirclesData(new CirclesRpc(Settings.chainConfigs.chiado.circlesRpcUrl));
            query = circlesData.getTrustRelations($connectedWallet.address, 25);
        }

        if (query && items.length === 0) {
            // TODO: Properly initialize
            query.queryNextPage().then(() => {
                if (!query?.currentPage?.results) {
                    return;
                }

                // All accounts trust themselves, so we filter them out
                items = query.currentPage.results
                    .filter((item) => item.truster !== item.trustee);
            });
        }
    }

    function contactTemplate(contact: TrustListRow) {
        const timestamp = new Date(contact.timestamp * 1000);
        const dateTime = `${timestamp.toLocaleDateString()} - ${timestamp.toLocaleTimeString()}`;
        if (contact.truster == $connectedWallet?.address) {
            // This wallet is the sender
            return `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 rounded-full">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                </svg>
                <div class="ml-4">
                    <p class="text-sm">${contact.trustee}</p>
                    <p class="text-xs text-gray-500">${dateTime}</p>
                </div>
            `;
        } else {
            // This wallet is the receiver
            return `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 rounded-full">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                <div class="ml-4">
                    <p class="text-sm font-medium">${contact.truster}</p>
                    <p class="text-xs text-gray-500">Added: ${dateTime}</p>
                </div>
            `;
        }
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
