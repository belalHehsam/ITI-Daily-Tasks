interface Device {
  increaseVolume(): void;
  decreaseVolume(): void;
  mute(): void;
}

class TV implements Device {
  increaseVolume(): void {
    console.log("TV volume increased");
  }

  decreaseVolume(): void {
    console.log("TV volume decreased");
  }

  mute(): void {
    console.log("TV muted");
  }
}

class Speaker implements Device {
  increaseVolume(): void {
    console.log("Speaker volume increased");
  }

  decreaseVolume(): void {
    console.log("Speaker volume decreased");
  }

  mute(): void {
    console.log("Speaker muted");
  }
}

class BasicRemote {
  constructor(protected device: Device) {}
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
