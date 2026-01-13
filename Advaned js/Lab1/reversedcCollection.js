function reverseByCall() {
    let arr = [].slice.call(arguments);
    // return arr.reverse()
    return [].reverse.call(arr);
}

function reverseByApply() {
    let arr = [].slice.apply(arguments);
    // return arr.reverse()
    return [].reverse.apply(arr)
}

function reverseByBind() {
    let arr = [].slice.call(arguments);
    let rev = [].reverse.bind(arr)
    return rev;
}

console.log(reverseByCall(1, 2, 3, 45))
console.log(reverseByApply(1, 2, 3, 45))
let rev = reverseByBind(1, 2, 4, 54);
console.log(rev());


