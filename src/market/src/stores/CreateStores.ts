import { AdStore } from "./AdStore";
import { Ad } from "../../../market-api/src/entity/Ad";

export function createStores(initialAds: Ad[] = []) {
    const adStore = new AdStore(initialAds);

    return {
        "adStore": adStore
    }
}