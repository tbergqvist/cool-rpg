import { PopupKey } from "./system";
import { RouteKey } from "./router";
import { WeaponId } from "../data/weapons";

export class HeroModel {
  name = "";
  hp = 100;
  
  skills = {
    unarmed: 0,
    rangedWeapons: 0,
    meleeWeapons: 0,
    speech: 0
  };
  equipment = {
    weaponId: WeaponId.Hands,
    headId: null,
    bodyId: null
  }
}

export class WalletModel {
  amount = 0;
}

export enum RatQuestState {
  NotStarted,
  Started,
  RatKilled,
  RatLeft,
  Finished,
  FightStarted,
}
export class RatQuestModel {
  state = RatQuestState.NotStarted;
}

export class RouterModel {
  key: RouteKey = "createHeroView";
  parameters?: any = null;
}

export class GameModel {
  version = 1;
  currentRoute: RouterModel = new RouterModel();
  currentPopup: (PopupKey | null) = null;
  
  wallet = new WalletModel();
  hero = new HeroModel();
  ratQuest = new RatQuestModel();
}