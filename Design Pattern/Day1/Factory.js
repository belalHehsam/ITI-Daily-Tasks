class Button {
    render() {
        throw new Error("render() must be implemented");
    }
}

class Checkbox {
    render() {
        throw new Error("render() must be implemented");
    }
}

class WindowsButton extends Button {
    render() {
        console.log("Rendering Windows Button");
    }
}

class MacButton extends Button {
    render() {
        console.log("Rendering Mac Button");
    }
}

class WindowsCheckbox extends Checkbox {
    render() {
        console.log("Rendering Windows Checkbox");
    }
}

class MacCheckbox extends Checkbox {
    render() {
        console.log("Rendering Mac Checkbox");
    }
}

class ButtonFactory {

    static createButton(type) {

        switch (type) {

            case "windows":
                return new WindowsButton();

            case "mac":
                return new MacButton();

            default:
                throw new Error("Invalid button type");
        }
    }
}

class CheckboxFactory {
    static createCheckbox(type) {
        switch (type) {
            case "windows":
                return new WindowsCheckbox();

            case "mac":
                return new MacCheckbox();

            default:
                throw new Error("Invalid checkbox type");
        }
    }
}

const button = ButtonFactory.createButton("windows");

const checkbox = CheckboxFactory.createCheckbox("mac");

button.render();
checkbox.render();