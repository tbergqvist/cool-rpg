import { RatQuest } from "./rat-quest";
import { computed } from "mobx";
import { Quest } from "./quest";
import { Wallet } from "../wallet";

export class Quests {
  private _ratQuest: RatQuest = new RatQuest(this._wallet);

  constructor(
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