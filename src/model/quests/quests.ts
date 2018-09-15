import { RatQuest } from "./rat-quest";
import { computed } from "mobx";
import { Quest } from "./quest";
import { GameModel } from "../model";
import { System } from "../system";

export class Quests {
  private _ratQuest: RatQuest = new RatQuest(this._model.ratQuest, this._system);

  constructor(
    private _model: GameModel,
    private _system: System
  ) {
  }

  @computed
  get ratQuest() {
    return this._ratQuest;
  }

  @computed
  get activeQuests(): Quest[] {
    return [this._ratQuest].filter(q => q.started);
  }
}