<script lang="ts">
    import type {TrustRelationRow} from "@circles-sdk/sdk/dist/AvatarInterface";
    import {goto} from "$app/navigation";
    import {connectedCirclesAvatar} from "../../stores/connectedCirclesAvatar";
    import ActionButton from "../../components/ActionButton.svelte";

    export let item: TrustRelationRow;

    async function handleTrashClick() {
        return $connectedCirclesAvatar?.untrust(item.objectAvatar);
    }

    async function handleAddClick() {
        return $connectedCirclesAvatar?.trust(item.objectAvatar);
    }

    async function handleSendClick() {
        goto(`/send/${item.objectAvatar}`);
        return Promise.resolve();
    }

    const timestamp = new Date(item.timestamp * 1000);
    const dateTime = `${timestamp.toLocaleDateString()} - ${timestamp.toLocaleTimeString()}`;
</script>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
     class="w-12 h-12 rounded-full">
    {#if item.relation === 'trusts'}
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"/>
    {:else if item.relation === 'trustedBy'}
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25"/>
    {:else}
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
    {/if}
</svg>

<div class="ml-4 flex-grow">
    <p class="text-sm font-medium">{item.objectAvatar}</p>
    <p class="text-xs text-gray-500">Added: {dateTime}</p>
</div>
{#if item.relation === 'trusts'}
    <ActionButton action={handleTrashClick} disabled={!$connectedCirclesAvatar} doneStateDuration={5000}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
    </ActionButton>
{:else if item.relation === 'mutuallyTrusts'}
    <ActionButton action={handleTrashClick} disabled={!$connectedCirclesAvatar} doneStateDuration={5000}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25"/>
        </svg>
    </ActionButton>
{:else if item.relation === 'trustedBy'}
    <ActionButton action={handleAddClick} disabled={!$connectedCirclesAvatar} doneStateDuration={5000}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
        </svg>
    </ActionButton>
{/if}
<ActionButton action={handleSendClick} disabled={!$connectedCirclesAvatar} doneStateDuration={5000}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
         class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/>
    </svg>
</ActionButton>