import { observable, computed, action } from "mobx";

export class Wallet {
  @observable private _money: number = 0;

  @action
  addMoney(amount: number) {
    this._money += amount;
  }

  @computed
  get money() {
    return this._money;
  }
}