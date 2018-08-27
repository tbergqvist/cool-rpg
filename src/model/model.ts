import { observable } from "mobx";
import { RouteKey, PopupKey } from "./system";

export class GameModel {
  @observable version = 1;
  @observable currentRoute: RouteKey = "createHeroView";
  @observable currentPopup: (PopupKey | undefined) = undefined;
}

export function getGameModel() {
  let savedState = localStorage.getItem("gameState");
  console.log(savedState);
  if (!savedState) {
    return new GameModel();
  } else {
    return Object.assign(new GameModel(), JSON.parse(savedState));
  }
}