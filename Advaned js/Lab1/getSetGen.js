function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function getSetGen() {
    const keys = Object.keys(this);

    for (let i = 0; i < keys.length; i++) {
        const prop = keys[i];

        if (typeof this[prop] !== 'function') {

            this[`get${capitalize(prop)}`] = function () {
                return this[prop];
            };

            this[`set${capitalize(prop)}`] = function (value) {
                this[prop] = value;
            };
        }
    }
}

// function getSetGen() {
//     for (let i = 0; i < Object.keys(this).length; i++) {
//         if (typeof Object.values(this)[i] !== 'function') {
//             let getName = get${ Object.keys(this)[i]
//         }
//         this[getName] = function () { return this[Object.keys(this)[i]] }
//         let setName = set${ Object.keys(this)[i]
//     }
//     this[setName] = function (value) { this[Object.keys(this)[i]] = value; }
// } } }


const mainObject = {
    id: "Sd-10",
    location: "sd",
    address: "123 street",
    getSetGen: getSetGen
}

const obj2 = {
    name: "belal",
    age: " 20",
}

mainObject.getSetGen()

mainObject.setId("MN-25");
mainObject.setLocation("EG");
mainObject.setAddress("Cairo");

console.log(mainObject.getId());
console.log(mainObject.getLocation());
console.log(mainObject.getAddress());
console.log(mainObject);


mainObject.getSetGen.call(obj2)
obj2.setName("salma");
obj2.setAge("24");

console.log(obj2.getName());
console.log(obj2.getAge());
console.log(obj2);
