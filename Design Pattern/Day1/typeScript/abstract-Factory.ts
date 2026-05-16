interface Keyboard {
  type(): void;
}

interface Mouse {
  click(): void;
}

interface Headset {
  sound(): void;
}

class BudgetKeyboard implements Keyboard {
  type(): void {
    console.log("Budget keyboard typing");
  }
}

class BudgetMouse implements Mouse {
  click(): void {
    console.log("Budget mouse clicking");
  }
}

class BudgetHeadset implements Headset {
  sound(): void {
    console.log("Budget headset sound");
  }
}

class PremiumKeyboard implements Keyboard {
  type(): void {
    console.log("Premium mechanical keyboard");
  }
}
class PremiumMouse implements Mouse {
  click(): void {
    console.log("Premium gaming mouse");
  }
}
class PremiumHeadset implements Headset {
  sound(): void {
    console.log("Premium surround headset");
  }
}

interface GamingSetupFactory {
  createKeyboard(): Keyboard;

  createMouse(): Mouse;

  createHeadset(): Headset;
}

class BudgetFactory implements GamingSetupFactory {
  createKeyboard(): Keyboard {
    return new BudgetKeyboard();
  }

  createMouse(): Mouse {
    return new BudgetMouse();
  }

  createHeadset(): Headset {
    return new BudgetHeadset();
  }
}

class PremiumFactory implements GamingSetupFactory {
  createKeyboard(): Keyboard {
    return new PremiumKeyboard();
  }

  createMouse(): Mouse {
    return new PremiumMouse();
  }

  createHeadset(): Headset {
    return new PremiumHeadset();
  }
}

function buildGamingSetup(factory: GamingSetupFactory) {
  const keyboard = factory.createKeyboard();

  const mouse = factory.createMouse();

  const headset = factory.createHeadset();

  keyboard.type();

  mouse.click();

  headset.sound();
}

const premium = new PremiumFactory();

buildGamingSetup(premium);
