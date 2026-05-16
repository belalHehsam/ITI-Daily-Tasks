class Count {
  private static instance: Count;

  private count: number = 0;

  private constructor() {}

  public static getInstance(): Count {
    if (!Count.instance) {
      Count.instance = new Count();
    }

    Count.instance.increment();

    return Count.instance;
  }

  private increment(): void {
    this.count++;
  }

  public getCount(): number {
    return this.count;
  }
}

const counter11 = Count.getInstance();

console.log(counter11.getCount());

const counter22 = Count.getInstance();

console.log(counter22.getCount());

const counter33 = Count.getInstance();

console.log(counter33.getCount());
