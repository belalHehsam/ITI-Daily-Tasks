class TV {
    increaseVolume() {
        console.log("TV volume increased");
    }
    decreaseVolume() {
        console.log("TV volume decreased");
    }
    mute() {
        console.log("TV muted");
    }
}
class Speaker {
    increaseVolume() {
        console.log("Speaker volume increased");
    }
    decreaseVolume() {
        console.log("Speaker volume decreased");
    }
    mute() {
        console.log("Speaker muted");
    }
}
class BasicRemote {
    constructor(device) {
        this.device = device;
    }
    increase() {
        this.device.increaseVolume();
    }
    decrease() {
        this.device.decreaseVolume();
    }
}
class AdvancedRemote extends BasicRemote {
    mute() {
        this.device.mute();
    }
}
const device = new TV();
const remote = new AdvancedRemote(device);
remote.increase();
export {};
//# sourceMappingURL=task3.js.map