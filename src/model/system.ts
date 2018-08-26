import { observable, action, computed } from "mobx";
import { CreateHeroView } from "../view/create-hero-view";
import { VillageView } from "../view/routes/village-view";
import { RatGuyView } from "../view/routes/rat-guy-view";
import { Route } from "./route";
import { QuestsPopupView } from "../view/popups/quests-popup-view";
import { Quests } from "./quests/quests";
import { BasementView } from "../view/routes/basement-view";
import { DialogController } from "./dialog/dialog-controller";
import { ratGuyDialog } from "./dialog/rat-guy-dialog";
import { ratDialog } from "./dialog/rat-dialog";
import { Wallet } from "./wallet";
import { Hero } from "./hero";

export class System {
  @observable private _currentRoute: Route<any>;
  @observable private _currentPopup: Route<any> | undefined;
  @observable private _wallet = new Wallet();
  @observable private _quests = new Quests(this._wallet);
  @observable private _hero: Hero | undefined; //TODO: remove undefined somehow

  constructor() {
    this._currentRoute = {component: CreateHeroView, parameters: {system: this}};
  }

  @action
  createHero(name: string) {
    this._hero = new Hero(name);
    this.setCurrentRoute({component: VillageView, parameters: {system: this}});
  }

  @action
  private setCurrentRoute<T>(route: Route<T>) {
    this._currentRoute = route;
  }
  
  @action
  private setCurrentPopup<T>(route: Route<T>) {
    this._currentPopup = route;
  }

  @action
  gotoRatGuy() {
    let dialogController = new DialogController(ratGuyDialog(this, this.quests.ratQuest));
    this.setCurrentRoute({component: RatGuyView, parameters: {dialogController}});
  }

  @action
  gotoBasement() {
    let dialogController = new DialogController(ratDialog(this, this.quests.ratQuest));
    this.setCurrentRoute({component: BasementView, parameters: {dialogController}});
  }

  @action
  gotoVillage() {
    this.setCurrentRoute({component: VillageView, parameters: {system: this}});
  }

  @action
  showQuestsPopup() {
    this.setCurrentPopup({component: QuestsPopupView, parameters: {system: this}});
  }

  @action
  closePopup() {
    this._currentPopup = undefined;
  }

  @computed
  get currentRoute() {
    return this._currentRoute;
  }

  @computed
  get currentPopup() {
    return this._currentPopup;
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