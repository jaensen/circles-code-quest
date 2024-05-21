import {goto} from "$app/navigation";

export function redirectToHome(doIt:boolean) {
    if (!doIt) return false;
    goto("/connect-wallet");
    return true;
}