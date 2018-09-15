import { action, computed } from "mobx";
import { System } from "./system";

interface EnemyModel {
  hp: number;
}

export interface FightModel {
  enemy: EnemyModel;
  onFightFinished: (system: System)=>void;
}

export class Fight {
  constructor(
    private _model: FightModel,
    private _system: System
  ) {
  }

  @action
  playerAttack() {
    this._model.enemy.hp -= 1;
    if (this._model.enemy.hp <= 0) {
      this._model.onFightFinished(this._system);
      //this._system.router.goto(this._model.nextRoute);
    }
  }

  @computed
  get enemyHp() {
    return this._model.enemy.hp;
  }
}