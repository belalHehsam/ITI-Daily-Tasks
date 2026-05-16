class Pizza {
    constructor() {
        this.size = "";
        this.cheese = false;
        this.pepperoni = false;
        this.olives = false;
    }

    showPizza() {
        console.log(this);
    }
}

class PizzaBuilder {
    constructor() {
        this.pizza = new Pizza();
        console.log("Value of This", this);
        console.log("Value of thiss.pizaa", this.pizza);
    }

    setSize(size) {
        this.pizza.size = size;
        return this;
    }

    addCheese() {
        this.pizza.cheese = true;
        return this;
    }

    addPepperoni() {
        this.pizza.pepperoni = true;
        return this;
    }

    addOlives() {
        this.pizza.olives = true;
        return this;
    }

    build() {
        return this.pizza;
    }

}

const pizza = new PizzaBuilder()
    .setSize("Large")
    .addCheese()
    .addOlives()
    .build();

pizza.showPizza();

