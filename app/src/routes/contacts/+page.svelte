<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import List from '../../components/List.svelte';
    import {onMount} from "svelte";
    import {redirectToHome} from "../../utils/redirectToHome";
    import {goto} from "$app/navigation";
    import type {TrustRelationRow} from "@circles-sdk/sdk/dist/AvatarInterface";
    import {connectedCirclesAvatar} from "../../stores/connectedCirclesAvatar";
    import ContactListItem from "./ContactListItem.svelte";
    import ActionButton from "../../components/ActionButton.svelte";

    onMount(() => {
        if (redirectToHome(!$connectedCirclesAvatar)) {
            return;
        }

        initializeQuery();

        return $connectedCirclesAvatar?.events.subscribe(async value => {
            if (value.name === "Trust") {
                console.log("Trust event received:", value.data);
                await initializeQuery()
            }
        });
    });

    let items: TrustRelationRow[] = [];

    async function initializeQuery() {
        if (!$connectedCirclesAvatar) {
            return;
        }

        const newItems = await $connectedCirclesAvatar.getTrustRelations();
        items = [];
        setTimeout(() => items = newItems, 0);
    }

    async function handleAddContact() {
        await goto('/contacts/add');
    }
</script>

<PageFrame title="Contacts">
    <div class="flex justify-between items-center mb-4">
        <ActionButton action={handleAddContact} disabled={!$connectedCirclesAvatar} doneStateDuration={5000}>
            Add Contact
        </ActionButton>
    </div>
    <List items={items}
          listItemComponent={ContactListItem}
    />
</PageFrame>
