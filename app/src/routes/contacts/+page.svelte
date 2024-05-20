<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import List from '../../components/List.svelte';
    import {onMount} from "svelte";
    import {redirectToHome} from "../../utils/redirectToHome";
    import {goto} from "$app/navigation";
    import type {TrustRelationRow} from "@circles-sdk/sdk/dist/AvatarInterface";
    import {connectedCirclesAvatar} from "../../stores/connectedCirclesAvatar";
    import ContactListItem from "./ContactListItem.svelte";

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

    function handleAddContact(): void {
        goto('/add-contact');
    }

    function onItemClick(e: CustomEvent) {
    }

    async function onContextAction(e: CustomEvent<{ item: TrustRelationRow, action: string }>) {
        if (!$connectedCirclesAvatar) {
            throw new Error("Not connected with a valid circles wallet");
        }

        const {item, action} = e.detail;
        if (action === 'delete') {
            await $connectedCirclesAvatar?.untrust(item.objectAvatar);
        }

        if (action === 'add') {
            await $connectedCirclesAvatar?.trust(item.objectAvatar);
        }

        if (action === 'send') {
            goto(`/send/${item.objectAvatar}`);
        }
    }
</script>

<PageFrame title="Contacts">
    <div class="flex justify-between items-center mb-4">
        <button class="bg-blue-500 text-white py-2 px-4 rounded-md" on:click={handleAddContact}>
            Add Contact
        </button>
    </div>
    <List items={items}
          listItemComponent={ContactListItem}
          on:itemClick={(e) => onItemClick(e)}
          on:contextAction={(e) => onContextAction(e)}
    />
</PageFrame>
