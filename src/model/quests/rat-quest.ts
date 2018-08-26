import { Quest } from "./quest";
import { observable, action, computed } from "mobx";
import { Wallet } from "../wallet";

export enum RatQuestState {
  NotStarted,
  Started,
  RatKilled,
  RatLeft,
  Finished
}

export class RatQuest implements Quest {
  name = "Rat-man";
  @observable private _state: RatQuestState = RatQuestState.NotStarted;
  
  constructor(
    private _wallet: Wallet
  ) {
  }

  @computed
  get started() {
    return this._state !== RatQuestState.NotStarted;
  }

  @action
  start() {
    this._state = RatQuestState.Started;
  }

  @action
  finish() {
    this._state = RatQuestState.Finished;
    this._wallet.addMoney(20);
  }

  @action
  killRat() {
    this._state = RatQuestState.RatKilled;
  }

  @action
  letRatLeave() {
    this._state = RatQuestState.RatLeft;
  }

  @computed
  get state() {
    return this._state;
  }
}