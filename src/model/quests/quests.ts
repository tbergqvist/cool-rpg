import { RatQuest } from "./rat-quest";
import { computed } from "mobx";
import { Quest } from "./quest";
import { Wallet } from "../wallet";
import { GameModel } from "../model";

export class Quests {
  private _ratQuest: RatQuest = new RatQuest(this._model.ratQuest, this._wallet);

  constructor(
    private _model: GameModel,
    private _wallet: Wallet
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