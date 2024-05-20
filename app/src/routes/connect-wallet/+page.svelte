<script lang="ts">
    import PageFrame from "../../components/PageFrame.svelte";
    import {connectedWallet} from "../../stores/connectedWallet";
    import {BrowserProvider} from "ethers";
    import {goto} from "$app/navigation";

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
    }
</script>

<PageFrame title="">
    <div class="flex flex-col items-center justify-center h-full p-6 space-y-4">
        <h1 class="text-2xl font-bold mb-4">Connect Your Wallet</h1>
        <p class="text-gray-700 mb-6 text-center">Please connect your Metamask wallet to continue.</p>
        <button class="bg-blue-500 text-white py-2 px-6 rounded-md" on:click={async () => {
            await connectMetaMask();
            await goto("/register-new");
        }}>
            Connect Metamask
        </button>
    </div>
</PageFrame>