class Teacher {
    getInfo() {
        return {
            name: "Belal",
        };
    }
}
class TeacherDecerator {
    constructor(teacher) {
        this.teacher = teacher;
    }
    getInfo() {
        return this.teacher.getInfo();
    }
}
class SalaryDecorator extends TeacherDecerator {
    constructor(teacher) {
        super(teacher);
        this.teacher = teacher;
        console.log("from salary", teacher);
    }
    getInfo() {
        return Object.assign(Object.assign({}, this.teacher.getInfo()), { salary: 5000 });
    }
}
class NationalityDecorator extends TeacherDecerator {
    constructor(teacher) {
        super(teacher);
        this.teacher = teacher;
        console.log("from nationality", teacher);
    }
    getInfo() {
        return Object.assign(Object.assign({}, this.teacher.getInfo()), { nationality: "Egyptian" });
    }
}
class StreetDecorator extends TeacherDecerator {
    constructor(teacher) {
        super(teacher);
        this.teacher = teacher;
        console.log("from street", teacher);
    }
    getInfo() {
        return Object.assign(Object.assign({}, this.teacher.getInfo()), { street: "Cairo Street" });
    }
}
const teacher = new StreetDecorator(new NationalityDecorator(new SalaryDecorator(new Teacher())));
console.log(teacher.getInfo());
export {};
//# sourceMappingURL=task1.js.map