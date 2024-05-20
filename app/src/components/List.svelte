<script lang="ts">
    interface Item {
        [key: string]: any;
    }

    export let items: Item[] = [];
    export let template: (item: Item) => string;
    export let onItemClick: (item: Item, index: number) => void = null;
</script>

<ul class="space-y-3">
    {#each items as item, index}
        <li class="bg-white p-3 rounded shadow flex items-center"
            on:click={() => onItemClick && onItemClick(item, index)}>
            {@html template(item)}
        </li>
    {/each}
</ul>
