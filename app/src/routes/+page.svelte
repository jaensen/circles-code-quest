<script>
    import PageFrame from "../components/PageFrame.svelte";
</script>

<PageFrame title="">
    <div class="flex flex-col items-center justify-center h-full p-6 space-y-4">
        <h1 class="text-3xl font-bold mb-4">Welcome to the App</h1>
        <p class="text-gray-700 mb-6 text-center">Your gateway to seamless transactions.</p>
        <a href="/connect-wallet" class="bg-blue-500 text-white py-2 px-6 rounded-md" on:click={() => { /* Navigate to Connect Wallet screen */ }}>
            Get Started
        </a>
    </div>
</PageFrame>
