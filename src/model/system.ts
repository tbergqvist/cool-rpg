import { observable, action, computed } from "mobx";
import { CreateHeroView } from "../view/create-hero-view";
import { VillageView } from "../view/routes/village-view";
import { RatGuyView } from "../view/routes/rat-guy-view";
import { Route } from "./route";
import { QuestsPopupView } from "../view/popups/quests-popup-view";
import { Quests } from "./quests/quests";
import { BasementView } from "../view/routes/basement-view";

export class System {
  @observable private _currentRoute: Route<any>;
  @observable private _currentPopup: Route<any> | undefined;
  @observable private _quests: Quests = new Quests();

  constructor() {
    this._currentRoute = {component: CreateHeroView, parameters: {system: this}};
  }

  @action
  createHero() {
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
    this.setCurrentRoute({component: RatGuyView, parameters: {system: this}});
  }

  @action
  gotoBasement() {
    this.setCurrentRoute({component: BasementView, parameters: {system: this}});
  }

  @action
  gotoVillage() {
    this.setCurrentRoute({component: VillageView, parameters: {system: this}});
  }

  @action
  showQuestsPopup() {
    this.setCurrentPopup({component: QuestsPopupView, parameters: {system: this}});
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
}