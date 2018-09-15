import { action, computed, set } from "mobx";

import { RouterModel } from "./model";

import { BasementView } from "../view/routes/basement-view";
import { DialogController } from "./dialog/dialog-controller";
import { ratGuyDialog } from "./dialog/rat-guy-dialog";
import { ratDialog } from "./dialog/rat-dialog";

import { CreateHeroView } from "../view/create-hero-view";
import { VillageView } from "../view/routes/village-view";
import { RatGuyView } from "../view/routes/rat-guy-view";
import { System } from "./system";
import { FightView } from "../view/routes/fight-view";
import { FightModel, Fight } from "./fight";

export interface Route<T> {
  component: (params: T) => JSX.Element;
  parameters: T;
}

export type RouteKey = keyof typeof routes;
let routes = {
  "createHeroView": (system: System): Route<ParameterType<typeof CreateHeroView>> => (
    { component: CreateHeroView, parameters: { system } }
  ),
  "villageView": (system: System): Route<ParameterType<typeof VillageView>> => (
    { component: VillageView, parameters: { system } }
  ),
  "basementView": (system: System): Route<ParameterType<typeof BasementView>> => {
    let dialogController = new DialogController(ratDialog(system, system.quests.ratQuest));
    return { component: BasementView, parameters: { dialogController } };
  },
  "ratGuyView": (system: System): Route<ParameterType<typeof RatGuyView>> => {
    let dialogController = new DialogController(ratGuyDialog(system, system.quests.ratQuest));
    return { component: RatGuyView, parameters: { dialogController } };
  },
  "fightView": (system: System, parameters: FightModel): Route<ParameterType<typeof FightView>> => {
    let fight = new Fight(parameters, system);
    return { component: FightView, parameters: { fight } };
  },
};

type IsValidArg<T> = T extends object ? keyof T extends never ? false : true : true;
type RouteParameterType<T extends RouteKey> =
  typeof routes[T] extends (system: System, p1: infer A) => Route<any> ? (
      IsValidArg<A> extends true ? [T, A] :
      [T]
  ) : never
;

type ParameterType<T extends Function> = T extends (p1: infer A) => JSX.Element ? A : never;

export class Router {
  constructor(
    private _system: System,
    private _model: RouterModel
  ) {
  }

  @computed
  get currentRoute() {
    const func: (system: System, parameters? :any) => Route<any> = routes[this._model.key];
    return () => func(this._system, this._model.parameters);
  }

  private setModel<T extends RouteKey>(parameters: RouteParameterType<T>) {
    this._model.key = parameters[0];
    set(this._model, {parameters: parameters[1]});
  }

  @action
  gotoRatGuy() {
    this.setModel(["ratGuyView"]);
  }

  @action
  gotoBasement() {
    this.setModel(["basementView"]);
  }

  @action
  gotoVillage() {
    this.setModel(["villageView"]);
  }

  @action
  goto<T extends RouteKey>(key: T) {
    this.setModel([<any>key]);
  }
  
  @action
  startFight(enemy: {hp: number}, func: (system: System)=>void) {
    this.setModel(["fightView", {enemy, onFightFinished: func}]);
  }
}