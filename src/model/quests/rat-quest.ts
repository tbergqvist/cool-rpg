import { Quest } from "./quest";
import { action, computed } from "mobx";
import { Wallet } from "../wallet";
import { RatQuestModel, RatQuestState } from "../model";

export class RatQuest implements Quest {
  name = "Rat-man";
  
  constructor(
    private _model: RatQuestModel,
    private _wallet: Wallet
  ) {
  }

  @computed
  get started() {
    return this._model.state !== RatQuestState.NotStarted;
  }

  @action
  start() {
    this._model.state = RatQuestState.Started;
  }

  @action
  finish() {
    this._model.state = RatQuestState.Finished;
    this._wallet.addMoney(20);
  }

  @action
  killRat() {
    this._model.state = RatQuestState.RatKilled;
  }

  @action
  letRatLeave() {
    this._model.state = RatQuestState.RatLeft;
  }

  @computed
  get state() {
    return this._model.state;
  }
}