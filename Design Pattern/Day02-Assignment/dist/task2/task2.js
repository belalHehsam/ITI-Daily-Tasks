class CountryService {
    async getCountries() {
        console.log("Fetching countries from API...");
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital");
        const data = await response.json();
        return data;
    }
}
class CountryServiceProxy {
    constructor() {
        this.countryServices = new CountryService();
        this.cache = null;
    }
    async getCountries() {
        if (this.cache) {
            console.log("From chaching");
            return this.cache;
        }
        const countries = await this.countryServices.getCountries();
        this.cache = countries.slice(0, 10);
        return this.cache;
    }
}
const service = new CountryServiceProxy();
await service.getCountries().then(console.log);
await service.getCountries().then(console.log);
export {};
//# sourceMappingURL=task2.js.map