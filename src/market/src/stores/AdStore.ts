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
    addAd = async (ad: Ad, thumbnail?: File, gallery?: FileList) => {
        const formData: FormData = new FormData();
        formData.append("thumbnail", thumbnail!);
        Array.from(gallery!).forEach(function (image) {
            formData.append('gallery', image);
        })
        formData.append('body', JSON.stringify({...ad}));
        const requestOptions = {
            method: "POST",
            body: formData
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

    @action
    async loadAd(id:number) {
        const adsResponse = await fetch(`http://localhost:3000/ads/${id}`);
        this.ads = await adsResponse.json();
        this.isLoading = false;
    }

    
}