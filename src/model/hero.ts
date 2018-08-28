import { computed } from "mobx";
import { HeroModel } from "./model";

export class Hero {
  constructor(
    private _model: HeroModel
  ) {
  }

  init(name: string) {
    this._model.name = name;
  }

  @computed
  get name() {
    return this._model.name;
  }
}