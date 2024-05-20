<script lang="ts">
    import {createEventDispatcher, type SvelteComponent} from "svelte";

    interface Item {
        [key: string]: any;
    }

    const eventDispatcher = createEventDispatcher();

    export let listItemComponent: typeof SvelteComponent;
    export let items: Item[] = [];

    function onItemClick(item: Item, index: number) {
        eventDispatcher('itemClick', {item, index});
    }
</script>

<ul class="space-y-3">
    {#each items as item, index}
        <li class="bg-white p-3 rounded shadow flex items-center"
            on:click={() => onItemClick && onItemClick(item, index)}>
            <svelte:component this={listItemComponent} {item} on:contextAction />
        </li>
    {/each}
</ul>
