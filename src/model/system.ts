import { observable, action, computed } from "mobx";
import { CreateHeroView } from "../view/create-hero-view";
import { VillageView } from "../view/routes/village-view";
import { RatGuyView } from "../view/routes/rat-guy-view";
import { QuestsPopupView } from "../view/popups/quests-popup-view";
import { Quests } from "./quests/quests";
import { BasementView } from "../view/routes/basement-view";
import { DialogController } from "./dialog/dialog-controller";
import { ratGuyDialog } from "./dialog/rat-guy-dialog";
import { ratDialog } from "./dialog/rat-dialog";
import { Wallet } from "./wallet";
import { Hero } from "./hero";
import { GameModel } from "./model";

export type RouteKey = keyof typeof routes;
let routes = {
  "createHeroView": (system: System)=>({component: CreateHeroView, parameters: {system}}),
  "villageView": (system: System)=>({component: VillageView, parameters: {system}}),
  "basementView": (system: System)=>{
    let dialogController = new DialogController(ratDialog(system, system.quests.ratQuest));
    return {component: BasementView, parameters: {dialogController}};
  },
  "ratGuyView": (system: System)=>{
    let dialogController = new DialogController(ratGuyDialog(system, system.quests.ratQuest));
    return {component: RatGuyView, parameters: {dialogController}};
  },
};

export type PopupKey = keyof typeof popups;
let popups = {
  "questsPopup": (system: System)=>({component: QuestsPopupView, parameters: {system}}),
};

export class System {
  @observable private _wallet = new Wallet(this._model.wallet);
  @observable private _quests = new Quests(this._model, this._wallet);
  @observable private _hero = new Hero(this._model.hero);

  constructor(
    private _model: GameModel
  ) {
    document.addEventListener("keydown", (e)=> {
      if (e.ctrlKey && e.keyCode === 83) {
        localStorage.setItem("gameState", JSON.stringify(this._model));
        e.preventDefault();
      }
    });
  }

  @computed
  get currentRoute() {
    console.log("hallå????");
    return ()=>routes[this._model.currentRoute](this);
  }

  @action
  createHero(name: string) {
    console.log("hallå?");
    this._hero.init(name);
    this.gotoVillage();
  }

  gotoRatGuy() {
    this._model.currentRoute = "ratGuyView";
  }

  @action
  gotoBasement() {
    this._model.currentRoute = "basementView";
  }

  @action
  gotoVillage() {
    this._model.currentRoute = "villageView";
  }

  @action
  showQuestsPopup() {
    this._model.currentPopup = "questsPopup";
  }

  @action
  closePopup() {
    this._model.currentPopup = undefined;
  }

  @computed
  get currentPopup() {
    let currentPopup = this._model.currentPopup;

    if (currentPopup != undefined) {
      return ()=>popups[currentPopup!](this);
    } else {
      return ()=>undefined;
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
}