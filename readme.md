# 简介

基于babel体系,借助babel转译插件开发方式为minits做预处理(typescript==>minits)

  以实现类的构造函数预处理为例

  ## input

  ```
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

  ```

  ## output

  ```
  class Employee {
    empCode: number;
    empName: string;

    constructor(empCode: number, empName: string) {
        this.empCode = empCode;
        this.empName = empName;
    }

    say() {
        console.log("Hello, %s!\n", this.empName);
    }

    }

    function Employee_constructor(_this: Employee, empCode: number, empName: string): void {
      _this.empCode = empCode;
      _this.empName = empName;
    }

    function main(): number {
      const a = new Employee(42, "Mohanson"),
            b = new Employee(2, 'Hu');
      Employee_constructor(b, 2, 'Hu')
      Employee_constructor(a, 42, "Mohanson")
      const c = new Employee(112, 'Wu');
      Employee_constructor(c, 112, 'Wu')
      a.say(); // Employee_say(a)

      return a.empCode;
    }
  ```

# 安装运行

```
 yarn
 npx babel .\examples\class-constructor.ts

```



# 参考

1. [babel体系介绍](https://zhuanlan.zhihu.com/p/43249121 "babel体系介绍")
2. [插件开发手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
3. [AST转化过程中节点类型手册](https://babeljs.io/docs/en/babel-types#objectexpression)
3. [官方babel插件example](https://github.com/babel/babel/tree/master/packages)
