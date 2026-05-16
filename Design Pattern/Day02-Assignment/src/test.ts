type User = {
  id: number;
  userName: string;
  age: number;
};

interface IUserServices {
  getUser(id: number): Promise<User>;
}

class UserServices implements IUserServices {
  async getUser(id: number): Promise<User> {
    console.log("Fetching from Api");
    return {
      id: 1,
      userName: "belal",
      age: 25,
    };
  }
}

class UserServicesProxy implements IUserServices {
  private userServices: IUserServices;
  private cache: Map<number, Promise<User>>;

  constructor() {
    this.userServices = new UserServices();
    this.cache = new Map();
  }

  async getUser(id: number): Promise<User> {
    if (this.cache.has(id)) {
      console.log("Returning from cache...");
      return this.cache.get(id)!;
    }

    const user = this.userServices.getUser(id);

    console.log("the user is ", user);

    this.cache.set(id, user);

    return user;
  }
}

const services = new UserServicesProxy();

services.getUser(1).then(console.log);
services.getUser(1).then(console.log);
services.getUser(1).then(console.log);
services.getUser(1).then(console.log);
