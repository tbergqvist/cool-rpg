export namespace Logger {

  function reduceThing(o: any) {
    if (typeof o !== "object") {
      return o;
    }

    let newObj: any = {};
    for (let key in o) {
      const descriptor = Object.getOwnPropertyDescriptor(o, key)!;
      newObj[key] = reduceThing(descriptor.get ? descriptor.get.call(o) : descriptor.value);
    }
    return newObj;
  }

  export function log(message: any) {
    if (typeof message === "object") {
      console.log(reduceThing(message));
    } else {
      console.log(message);
    }
  }
}

