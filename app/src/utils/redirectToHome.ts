import {goto} from "$app/navigation";

export function redirectToHome(doIt:boolean) {
    if (!doIt) return;
    goto("/connect-wallet");
}