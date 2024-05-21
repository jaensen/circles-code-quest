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
    import ActionButton from "../../components/ActionButton.svelte";

    onMount(() => {
        redirectToHome(!$isWalletConnected);
    });

    async function createAccount() {
        if (!$connectedWallet?.signer) {
            throw new Error('Signer not found');
        }

        const sdk = new Sdk(Settings.chainConfigs.chiado, $connectedWallet.signer);
        const avatar = await sdk.registerHuman();
        setConnectedCirclesAvatar(avatar);

        if ($connectedCirclesAvatar?.avatarInfo) {
            goto("/dashboard");
        }
    }
</script>

<PageFrame title="">
    <div class="flex flex-col items-center justify-center h-full p-6 space-y-4">
        <h1 class="text-2xl font-bold mb-4">Register a New Account</h1>
        <p class="text-gray-700 mb-6 text-center">Click the button below to create a new account.</p>
        <ActionButton
                action={createAccount}
                disabled={!!$connectedCirclesAvatar}
                theme={{
                    Ready: "bg-green-500 text-white",
                    Working: 'bg-gray-200 text-black',
                    Error: 'bg-yellow-500 text-white',
                    Retry: 'bg-yellow-500 text-white',
                    Done: 'bg-green-500 text-white',
                    Disabled: 'bg-gray-400 text-white',
                }}
        >
            Create Account
        </ActionButton>
        <ActionButton action={disconnectWallet} disabled={!!$connectedCirclesAvatar}>
            Connect different wallet
        </ActionButton>
    </div>
</PageFrame>