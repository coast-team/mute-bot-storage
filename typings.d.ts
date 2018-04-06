// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any
declare var log: any

declare namespace NodeJS {
  interface Global {
    log: any
  }
}
