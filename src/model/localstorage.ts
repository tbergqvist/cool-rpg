import { observable } from "mobx";
import { GameModel } from "./model";

export namespace LocalStorage {
  function transform(target: any, transformer: (key: string, value: string) => {key: string, value: string}) {
    if (target == null || typeof target !== "object") {
      return target;
    }

    let newObj: any = {};
    for (let key in target) {
      let value = transform(target[key], transformer);
      if (typeof value === "function") {
        let transformation = transformer(key, value);
        newObj[transformation.key] = transformation.value;
      } else {
        newObj[key] = value;
      }
    }
    return newObj;
  }

  function parse(json: string) {
    let val = JSON.parse(json, function (key: string, value) {
      if (key.startsWith("func_")) {
        return eval(value);
      } else {
        return value;
      }
    });

    return transform(val, (key, value)=> {
      return {key: key.substring(5), value: value};
    });
  }

  function stringify(gameModel: any) {
    let newObj: any = transform(gameModel, (key, value)=> {
      return {key: "func_" + key, value: value.toString()};
    });

    return JSON.stringify(newObj);
  }

  export function getGameModel() {
    let savedState = localStorage.getItem("gameState");
    if (!savedState) {
      return observable(parse(stringify(new GameModel())));
    } else {
      let state: GameModel = observable(parse(savedState));
      return state;
    }
  }
  
  export function saveGameModel(gameModel: GameModel) {
    localStorage.setItem("gameState", stringify(gameModel));
  }
}