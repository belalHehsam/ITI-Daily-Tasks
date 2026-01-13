const LnkdLstObj = {
    data: [],

    Enqueue: function (value) {
        this.checkDuplicate(value);
        if (this.data.length > 0 && this.data[0].val <= value) {
            throw new Error("the value to insert isn't in sorted order")
        }
        this.data.unshift({ val: value });
    }
    ,

    push: function (value) {
        this.checkDuplicate(value);
        if (this.data.length > 0 && this.data[this.data.length - 1].val > value) {
            throw new Error("the value to insert isn't in sorted order")
        }
        this.data.push({ val: value });
    },

    insert: function (value, index) {
        this.checkDuplicate(value);
        if (index > this.data.length || index < 0)
            throw new Error("invalid index");

        // insert at beginning
        if (index == 0) {
            if (this.data.length > 0 && value > this.data[index].val)
                throw new Error("the value to insert isn't in sorted order");
        }

        // insert at end of array
        if (index == this.data.length - 1) {
            if (value > this.data[index].val)
                throw new Error("the value to insert isn't in sorted order");
        }

        // insert at middle of array
        else if (value < this.data[index - 1].val || value > this.data[index].val)
            throw new Error("the value to insert isn't in sorted order");

        this.data.splice(index, 0, { val: value });
    },

    remove: function (value, index) {
        if (index < 0 || index > this.data.length)
            throw new Error("out of bound");
        if (this.data[index].val != value)
            throw new Error("Data not found");
        this.data.splice(index, 1);
    },

    pop: function () {
        if (this.data.length == 0)
            throw new Error("array is empty")
        this.data.pop();
    },

    Dequeue: function () {
        if (this.data.length == 0)
            throw new Error("array is empty")
        this.data.shift();
    },

    display: function () {
        for (let i = 0; i < this.data.length; i++) {
            console.log(this.data[i]);
        }
    },

    checkDuplicate: function (value) {
        for (let item of this.data) {
            if (item.val === value) {
                throw new Error("duplicate value is not allowed");
            }
        }
    }

}


LnkdLstObj.Enqueue(5)
LnkdLstObj.Enqueue(2)
LnkdLstObj.push(10)

// LnkdLstObj.display()

// LnkdLstObj.Dequeue()

// LnkdLstObj.pop()

// LnkdLstObj.insert(3, 1)
// LnkdLstObj.insert(1, 5)
// LnkdLstObj.display()

