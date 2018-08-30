import { observable, action, computed } from "mobx";

import { QuestsPopupView } from "../view/popups/quests-popup-view";
import { Quests } from "./quests/quests";

import { Wallet } from "./wallet";
import { Hero } from "./hero";
import { GameModel } from "./model";
import { Router } from "./router";

export type PopupKey = keyof typeof popups;
let popups = {
  "questsPopup": (system: System)=>({component: QuestsPopupView, parameters: {system}}),
};

export class System {
  @observable private _wallet = new Wallet(this._model.wallet);
  @observable private _quests = new Quests(this._model, this._wallet);
  @observable private _hero = new Hero(this._model.hero);
  @observable private _router = new Router(this, this._model.currentRoute);

  constructor(
    private _model: GameModel
  ) {
    document.addEventListener("keydown", (e)=> {
      if (e.ctrlKey && e.keyCode === 83) { //S
        localStorage.setItem("gameState", JSON.stringify(this._model));
        e.preventDefault();
      } else if (e.ctrlKey && e.keyCode === 68) { //D 
        localStorage.removeItem("gameState");
        e.preventDefault();
      }
    });
  }

  @action
  createHero(name: string) {
    this._hero.init(name);
    this._router.gotoVillage();
  }

  @action
  showQuestsPopup() {
    this._model.currentPopup = "questsPopup";
  }

  @action
  closePopup() {
    this._model.currentPopup = null;
  }

  @computed
  get currentPopup(): any {
    if (this._model.currentPopup != null) {
      return ()=>popups[this._model.currentPopup!](this);
    } else {
      return ()=>null;
    }
  }

  @computed
  get quests() {
    return this._quests;
  }

  @computed
  get wallet() {
    return this._wallet;
  }

  @computed
  get hero() {
    return this._hero;
  }

  @computed
  get router() {
    return this._router;
  }
}