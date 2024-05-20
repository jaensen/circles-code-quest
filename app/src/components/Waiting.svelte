<script lang="ts">

    export let title: string;
    export let description: string;
</script>
<div class="flex flex-col items-center justify-center h-full p-6 space-y-4">
    <h1 class="text-2xl font-bold mb-4">{title}</h1>
    <p class="text-gray-700 mb-6 text-center">{description}</p>
    <div class="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
</div>