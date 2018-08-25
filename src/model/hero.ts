import { observable, computed } from "mobx";

export class Hero {
  @observable
  private _name: string;

  constructor(
    name: string
  ) {
    this._name = name;
  }

  @computed
  get name() {
    return this._name;
  }
}