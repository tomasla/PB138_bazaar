import {action, observable} from "mobx";
import {Ad} from "../../../market-api/src/entity/Ad";


export class AdStore {
    @observable
    ads: Array<Ad>;

    @observable
    isLoading: boolean;

    constructor(fixtures: Ad[]) {
        this.ads = fixtures;
        this.isLoading = true;
    }

    @action
    addAd = async (ad: Ad) => {
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...ad})
        };
        const res = await fetch("http://localhost:3000/ads", requestOptions);
        this.ads.push(ad);
        return await res.json();
    }

    @action
    loadAds = async () => {
        const adsResponse = await fetch("http://localhost:3000/ads");
        this.ads = await adsResponse.json();
        this.isLoading = false;
    }
}