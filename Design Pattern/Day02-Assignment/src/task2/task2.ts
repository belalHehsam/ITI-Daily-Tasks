type Country = {
  name: string;
  capital: string;
};

interface ICountryServices {
  getCountries(): Promise<Country[]>;
}

class CountryService implements ICountryServices {
  async getCountries(): Promise<Country[]> {
    console.log("Fetching countries from API...");
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital",
    );
    const data = await response.json();
    return data;
  }
}

class CountryServiceProxy implements ICountryServices {
  private countryServices: ICountryServices;
  private cache: Country[] | null;

  constructor() {
    this.countryServices = new CountryService();
    this.cache = null;
  }

  async getCountries(): Promise<Country[]> {
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
