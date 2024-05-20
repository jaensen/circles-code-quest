<script lang="ts">
    import type {TrustRelationRow} from "@circles-sdk/sdk/dist/AvatarInterface";
    import {createEventDispatcher} from 'svelte';

    export let item: TrustRelationRow;

    const dispatch = createEventDispatcher();

    function handleTrashClick(event: MouseEvent) {
        event.stopPropagation();
        dispatch('contextAction', {
            item: item,
            action: 'delete'
        });
    }

    function handleAddClick(event: MouseEvent) {
        event.stopPropagation();
        dispatch('contextAction', {
            item: item,
            action: 'add'
        });
    }

    function handleSendClick(event: MouseEvent) {
        event.stopPropagation();
        dispatch('contextAction', {
            item: item,
            action: 'send'
        });
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
{#if item.relation === 'trusts' || item.relation === 'mutuallyTrusts'}
    <button class="ml-auto p-2 bg-red-500 text-white rounded" on:click={handleTrashClick} aria-label="Delete">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
    </button>
{:else if item.relation === 'trustedBy'}
    <button class="ml-auto p-2 bg-green-500 text-white rounded" on:click={handleAddClick} aria-label="Add">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
        </svg>
    </button>
{/if}
<button class="ml-2 p-2 bg-blue-500 text-white rounded" on:click={handleSendClick} aria-label="Add">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
         class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/>
    </svg>
</button>