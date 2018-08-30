import { action, computed } from "mobx";

import { RouterModel } from "./model";

import { BasementView } from "../view/routes/basement-view";
import { DialogController } from "./dialog/dialog-controller";
import { ratGuyDialog } from "./dialog/rat-guy-dialog";
import { ratDialog } from "./dialog/rat-dialog";

import { CreateHeroView } from "../view/create-hero-view";
import { VillageView } from "../view/routes/village-view";
import { RatGuyView } from "../view/routes/rat-guy-view";
import { System } from "./system";

export interface Route<T> {
  component: (params: T) => JSX.Element;
  parameters: T;
}

export type RouteKey = keyof typeof routes;
let routes = {
  "createHeroView": (system: System) => ({ component: CreateHeroView, parameters: { system } }),
  "villageView": (system: System) => ({ component: VillageView, parameters: { system } }),
  "basementView": (system: System) => {
    let dialogController = new DialogController(ratDialog(system, system.quests.ratQuest));
    return { component: BasementView, parameters: { dialogController } };
  },
  "ratGuyView": (system: System) => {
    let dialogController = new DialogController(ratGuyDialog(system, system.quests.ratQuest));
    return { component: RatGuyView, parameters: { dialogController } };
  },
};

type IsValidArg<T> = T extends object ? keyof T extends never ? false : true : true;
type RouteParameterType<T extends RouteKey> =
  typeof routes[T] extends (system: System, p1: infer A) => Route<any> ? (
      IsValidArg<A> extends true ? [T, A] :
      [T]
  ) : never
;

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
    this._model.parameters = parameters[1];
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
}