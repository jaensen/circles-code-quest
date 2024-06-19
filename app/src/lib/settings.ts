import type {ChainConfig} from "@circles-sdk/sdk";

export class Settings {
    public static readonly chainConfigs: { "chiado": ChainConfig, "gnosis": ChainConfig } = {
        "chiado": {
            pathfinderUrl: 'https://pathfinder.aboutcircles.com',
            circlesRpcUrl: 'http://localhost:8545',
            v1HubAddress: "0xdbf22d4e8962db3b2f1d9ff55be728a887e47710",
            v2HubAddress: "0xFFfbD3E62203B888bb8E09c1fcAcE58242674964",
            migrationAddress: "0x0A1D308a39A6dF8972A972E586E4b4b3Dc73520f",
        },
        "gnosis": {
            pathfinderUrl: 'https://pathfinder.aboutcircles.com',
            circlesRpcUrl: "https://rpc.helsinki.aboutcircles.com",
            v1HubAddress: "0x29b9a7fBb8995b2423a71cC17cf9810798F6C543",
            v2HubAddress: "0xFFfbD3E62203B888bb8E09c1fcAcE58242674964",
            migrationAddress: "0x0A1D308a39A6dF8972A972E586E4b4b3Dc73520f"
        }
    };
}