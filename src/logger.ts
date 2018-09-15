import { isObservable, toJS } from "mobx";

export namespace Logger {
  export function log(message: any) {
    console.log(isObservable(message) ? toJS(message) : message);
  }

  export function error(message: any) {
    console.error(isObservable(message) ? toJS(message) : message);
  }
}