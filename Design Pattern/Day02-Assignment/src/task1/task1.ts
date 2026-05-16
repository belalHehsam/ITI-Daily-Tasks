interface ITeacher {
  getInfo(): object;
}

class Teacher implements ITeacher {
  getInfo(): object {
    return {
      name: "Belal",
    };
  }
}

class TeacherDecerator implements ITeacher {
  constructor(protected teacher: ITeacher) {}

  getInfo(): object {
    return this.teacher.getInfo();
  }
}

class SalaryDecorator extends TeacherDecerator {
  constructor(protected teacher: ITeacher) {
    super(teacher);
    console.log("from salary", teacher);
  }

  getInfo(): object {
    return {
      ...this.teacher.getInfo(),
      salary: 5000,
    };
  }
}

class NationalityDecorator extends TeacherDecerator {
  constructor(protected teacher: ITeacher) {
    super(teacher);
    console.log("from nationality", teacher);
  }
  getInfo(): object {
    return {
      ...this.teacher.getInfo(),
      nationality: "Egyptian",
    };
  }
}

class StreetDecorator extends TeacherDecerator {
  constructor(protected teacher: ITeacher) {
    super(teacher);
    console.log("from street", teacher);
  }
  getInfo(): object {
    return {
      ...this.teacher.getInfo(),
      street: "Cairo Street",
    };
  }
}

const teacher = new StreetDecorator(
  new NationalityDecorator(new SalaryDecorator(new Teacher())),
);

console.log(teacher.getInfo());
