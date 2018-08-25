import { Quest } from "./quest";
import { observable, action, computed } from "mobx";

export enum RatQuestState {
  NotStarted,
  Started,
  RatKilled,
  RatLeft,
}

export class RatQuest implements Quest {
  name = "Rat-man";
  @observable private _state: RatQuestState = RatQuestState.NotStarted;
  
  get started() {
    return this._state !== RatQuestState.NotStarted;
  }

  get finished() {
    return this._state === RatQuestState.RatKilled || this._state === RatQuestState.RatLeft;
  }

  start() {
    this._state = RatQuestState.Started;
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