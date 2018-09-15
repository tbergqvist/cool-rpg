import { Quest } from "./quest";
import { action, computed } from "mobx";
import { RatQuestModel, RatQuestState } from "../model";
import { System } from "../system";
import { EnemyId } from "../../data/enemies";

export class RatQuest implements Quest {
  name = "Rat-man";
  
  constructor(
    private _model: RatQuestModel,
    private _system: System
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
  startFight() {
    this._model.state = RatQuestState.FightStarted;
    this._system.router.startFight(EnemyId.Rat, (system: System) => {
      system.quests.ratQuest.killRat();
    });
  }

  @action
  finish() {
    this._model.state = RatQuestState.Finished;
    this._system.wallet.addMoney(20);
  }

  @action
  killRat() {
    this._model.state = RatQuestState.RatKilled;
    this._system.router.gotoVillage();
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