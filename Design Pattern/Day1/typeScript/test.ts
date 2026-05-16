interface Character {
  attack(): void;
}

class Warrior implements Character {
  attack(): void {
    console.log("Warrior");
  }
}

class Mage implements Character {
  attack(): void {
    console.log("mege");
  }
}

class Archer implements Character {
  attack(): void {
    console.log("Archer");
  }
}

abstract class CharacterFactory {
  abstract CharacterFactory(): Character;
  play() {
    const characterrr = this.CharacterFactory();
    characterrr.attack();
  }
}

class WarriorFactory extends CharacterFactory {
  CharacterFactory(): Character {
    return new Warrior();
  }
}

class MageFactory extends CharacterFactory {
  CharacterFactory(): Character {
    return new Mage();
  }
}

class ArcherFactory extends CharacterFactory {
  CharacterFactory(): Character {
    return new Archer();
  }
}

const warriorr = new WarriorFactory();
const megee = new MageFactory();

warriorr.play();
megee.play();
