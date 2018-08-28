import { computed, action } from "mobx";
import { WalletModel } from "./model";

export class Wallet {
  constructor(
    private _model: WalletModel
  ) {
  }

  @action
  addMoney(amount: number) {
    this._model.amount += amount;
  }

  @computed
  get money() {
    return this._model.amount;
  }
}