class Employee {
    empCode: number;
    empName: string;
  
    constructor(empCode: number, empName: string) {
      this.empCode = empCode;
      this.empName = empName;
    }
  
    say() {
      console.log("Hello, %s!\n", this.empName)
    }
  }
  
  function main(): number {
    const a = new Employee(42, "Mohanson"), b = new Employee(2,'Hu')
    const c = new Employee(112,'Wu')
    a.say(); // Employee_say(a)
    return a.empCode;
  }
