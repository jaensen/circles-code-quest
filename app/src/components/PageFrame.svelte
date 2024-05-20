<script lang="ts">
    export let title: string = "";
</script>

<main class="p-4">
    <h1 class="text-lg font-semibold mb-4">{title}</h1>
    <slot></slot>
</main>