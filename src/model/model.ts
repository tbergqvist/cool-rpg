import { PopupKey } from "./system";
import { observable } from "mobx";
import { RouteKey } from "./router";

export class HeroModel {
  name = "";
}

export class WalletModel {
  amount = 0;
}

export enum RatQuestState {
  NotStarted,
  Started,
  RatKilled,
  RatLeft,
  Finished
}
export class RatQuestModel {
  state = RatQuestState.NotStarted;
}

export class RouterModel {
  key: RouteKey = "createHeroView";
  parameters?: any;
}

export class GameModel {
  version = 1;
  currentRoute: RouterModel = new RouterModel();
  currentPopup: (PopupKey | null) = null;
  
  wallet = new WalletModel();
  hero = new HeroModel();
  ratQuest = new RatQuestModel();
}

export function getGameModel() {
  let savedState = localStorage.getItem("gameState");
  if (!savedState) {
    return observable(JSON.parse(JSON.stringify(new GameModel())));
  } else {
    let state: GameModel = observable(JSON.parse(savedState));
    return state;
  }
}