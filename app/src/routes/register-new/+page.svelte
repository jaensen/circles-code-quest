<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import {goto} from "$app/navigation";
    import {connectedWallet} from "../../stores/connectedWallet";
    import {onMount} from "svelte";
    import {isWalletConnected} from "../../stores/isWalletConnected";
    import {redirectToHome} from "../../utils/redirectToHome";
    import {disconnectWallet} from "../../utils/disconnectWallet";
    import {Sdk} from "@circles-sdk/sdk";
    import {Settings} from "$lib/settings";
    import {connectedCirclesAvatar, setConnectedCirclesAvatar} from "../../stores/connectedCirclesAvatar";
    import Waiting from "../../components/Waiting.svelte";

    let isWaiting = false;

    onMount(() => {
        redirectToHome(!$isWalletConnected);
    });

    async function createAccount() {
        isWaiting = true;

        if (!$connectedWallet?.signer) {
            throw new Error('Signer not found');
        }

        const sdk = new Sdk(Settings.chainConfigs.chiado, $connectedWallet.signer);
        const avatar = await sdk.registerHuman();
        setConnectedCirclesAvatar(avatar);

        isWaiting = false;

        if ($connectedCirclesAvatar?.avatarInfo) {
            goto("/dashboard");
        }
    }
</script>

<PageFrame title="">
    {#if !isWaiting}
        <div class="flex flex-col items-center justify-center h-full p-6 space-y-4">
            {#if !$connectedCirclesAvatar}
                <h1 class="text-2xl font-bold mb-4">Register a New Account</h1>
                <p class="text-gray-700 mb-6 text-center">Click the button below to create a new account.</p>
                <button class="bg-blue-500 text-white py-2 px-6 rounded-md" on:click={createAccount}>
                    Create Account
                </button>
                <button class="bg-gray-500 text-white py-2 px-6 rounded-md" on:click={() => {
                    disconnectWallet();
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
                    disconnectWallet();
                 }}>
                    Connect different wallet
                </button>
            {/if}
        </div>
    {:else}
        <Waiting title="Creating Account..." description="Please wait while we set up your new account."/>
    {/if}

    <style>
        .loader {
            border-width: 4px;
        }
    </style>
</PageFrame>