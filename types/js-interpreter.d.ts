declare module 'js-interpreter' {
    class Interpreter {
      constructor(code: string, initFunc?: (interpreter: Interpreter, globalObject: any) => void);
      step(): boolean;
      run(): void;
      setProperty(scope: any, name: string, value: any): void;
      createNativeFunction(func: Function): any;
    }
    export = Interpreter;
}
