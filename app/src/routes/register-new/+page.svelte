<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import {goto} from "$app/navigation";
    import {connectedWallet} from "../../stores/connectedWallet";
    import {isCirclesWallet, isCirclesWalletCache} from "../../stores/isCirclesWallet";
    import {onMount} from "svelte";
    import {isWalletConnected} from "../../stores/isWalletConnected";
    import {redirectToHome} from "../../utils/redirectToHome";

    let isWaiting = false;

    onMount(() => {
        redirectToHome(!$isWalletConnected);
    });

    function createAccount() {
        isWaiting = true;
        // Simulate account creation process
        setTimeout(() => {
            isWaiting = false;
            // Account creation logic here
            isCirclesWalletCache["0x123"] = "SignedUp";
            const addr = $connectedWallet?.address;
            $connectedWallet = {
                address: addr
            }
            goto("/dashboard");
        }, 3000);
    }
</script>

<PageFrame title="">
    <div class="flex flex-col items-center justify-center h-full p-6 space-y-4">
        {#if !isWaiting}
            {#if !$isCirclesWallet}
                <h1 class="text-2xl font-bold mb-4">Register a New Account</h1>
                <p class="text-gray-700 mb-6 text-center">Click the button below to create a new account.</p>
                <button class="bg-blue-500 text-white py-2 px-6 rounded-md" on:click={createAccount}>
                    Create Account
                </button>
                <button class="bg-gray-500 text-white py-2 px-6 rounded-md" on:click={() => {
                    $connectedWallet = undefined;
                    goto("/connect-wallet");
                 }}>
                    Connect different wallet
                </button>
            {:else}
                <p class="text-gray-700 mb-6 text-center">This wallet is already signed up at Circles.</p>
                <p class="text-gray-700 mb-6 text-center">Click "Continue" to use it.</p>
                <button class="bg-green-500 text-white py-2 px-6 rounded-md" on:click={() => {
                    goto("/dashboard");
                 }}>
                    Continue
                </button>
                <button class="bg-gray-500 text-white py-2 px-6 rounded-md" on:click={() => {
                    $connectedWallet = undefined;
                    goto("/connect-wallet");
                 }}>
                    Connect different wallet
                </button>
            {/if}
        {/if}
        {#if isWaiting}
            <h1 class="text-2xl font-bold mb-4">Creating Account...</h1>
            <p class="text-gray-700 mb-6 text-center">Please wait while we set up your new account.</p>
            <div class="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        {/if}
    </div>

    <style>
        .loader {
            border-width: 4px;
        }
    </style>
</PageFrame>