<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import {connectedWallet} from "../../stores/connectedWallet";
    import {BrowserProvider} from "ethers";
    import {goto} from "$app/navigation";
    import ActionButton from "../../components/ActionButton.svelte";
    import {Sdk} from "@circles-sdk/sdk";
    import {Settings} from "$lib/settings";

    async function connectMetaMask() {
        const w: any = window;
        if (w.ethereum) {
            const provider = new BrowserProvider(w.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            $connectedWallet = {
                provider,
                signer,
                address
            };
        } else {
            throw new Error('MetaMask not found');
        }

        const signerAddress = await $connectedWallet.signer.getAddress();
        const sdk = new Sdk(Settings.chainConfigs.gnosis, $connectedWallet.signer);
        const avatarInfo = await sdk.data.getAvatarInfo(signerAddress);

        // If the wallet is already a registered Circles wallet, go to the dashboard.
        // Otherwise, go to the registration page.
        if (!avatarInfo) {
            await goto("/register-new");
        } else {
            await goto("/dashboard");
        }
    }
</script>

<PageFrame title="">
    <div class="flex flex-col items-center justify-center h-full p-6 space-y-4">
        <h1 class="text-2xl font-bold mb-4">Connect Your Wallet</h1>
        <p class="text-gray-700 mb-6 text-center">Please connect your Metamask wallet to continue.</p>

        <ActionButton action={connectMetaMask} doneStateDuration={5000}>
            Connect Metamask
        </ActionButton>
    </div>
</PageFrame>