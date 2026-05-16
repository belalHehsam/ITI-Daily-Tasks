class UserServices {
    async getUser(id) {
        console.log("Fetching from Api");
        return {
            id: 1,
            userName: "belal",
            age: 25,
        };
    }
}
class UserServicesProxy {
    constructor() {
        this.userServices = new UserServices();
        this.cache = new Map();
    }
    async getUser(id) {
        if (this.cache.has(id)) {
            console.log("Returning from cache...");
            return this.cache.get(id);
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
export {};
//# sourceMappingURL=test.js.map