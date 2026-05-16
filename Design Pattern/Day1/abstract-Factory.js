class Button {
    render() {
        throw new Error("render() must be implemented");
    }
}

class CheckBox {
    render() {
        throw new Error("render() must be implemented");
    }
}

class WindowsButton extends Button {
    render() {
        console.log("Rendering Windows Button");
    }
}

class WindowsCheckbox extends CheckBox {
    render() {
        console.log("Rendering Windows Checkbox");
    }
}

class MacButton extends Button {
    render() {
        console.log("Rendering mac Button");
    }
}

class MacCheckBox extends CheckBox {
    render() {
        console.log("Rendering mac CheckBox");
    }
}

class GUIFactory {
    createButton() {
        throw new Error("createButton() must be implemented");
    }

    createCheckbox() {
        throw new Error("createCheckbox() must be implemented");
    }
}

class WindowsFactory extends GUIFactory {
    createButton() {
        return new WindowsButton();
    }

    createCheckbox() {
        return new WindowsCheckbox();
    }
}

class MacFactory extends GUIFactory {
    createButton() {
        return new MacButton();
    }

    createCheckbox() {
        return new MacCheckbox();
    }
}

function renderUI(factory) {
    const button = factory.createButton();
    const checkbox = factory.createCheckbox();

    button.render();
    checkbox.render();
}

const windows = new WindowsFactory();

renderUI(windows)