class Counter {
    constructor() {
        if (Counter.instance) {
            return Counter.instance;
        }
        this.count = 0;
        Counter.instance = this;
    }

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }

    getCount() {
        return this.count;
    }
}

const counter = new Counter();
const counter2 = new Counter();
const counter3 = new Counter();
const counter4 = new Counter();

counter.increment();
counter2.increment();
counter3.increment();
counter4.increment();

console.log(counter.getCount());

