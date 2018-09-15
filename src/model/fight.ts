import { action, computed } from "mobx";
import { System } from "./system";
import { Enemy } from "../data/enemies";
import { Logger } from "../logger";

export interface FightModel {
  enemy: Enemy;
  onFightFinished: (system: System)=>void;
  battleLog: string[];
}

export class Fight {
  constructor(
    private _model: FightModel,
    private _system: System
  ) {
  }

  @action
  playerAction() {
    const hero = this._system.hero;
    const enemy = this._model.enemy;

    let enemyDamageTaken = hero.attackPower;

    this._model.battleLog.push(`You attack ${enemy.name}`);
    this._model.battleLog.push(`It does ${enemyDamageTaken} damage!`);

    enemy.hp -= enemyDamageTaken;
    if (enemy.hp <= 0) {
      this._model.onFightFinished(this._system);
      return;
    }

    let enemyAction = this.randomItem(enemy.actions);
    let heroDamageTaken = this.random(enemyAction.minDamage, enemyAction.maxDamage);
    this._model.battleLog.push(`${enemy.name} uses ${enemyAction.name}`);
    this._model.battleLog.push(`It does ${heroDamageTaken} damage!`);
    hero.takeDamage(heroDamageTaken);
    if (hero.hp <= 0) {
      Logger.log("Game Over!");

    }
  }

  private random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private randomItem<T>(actions: T[]): T {
    const rand = Math.floor(Math.random() * actions.length);
    return actions[rand];
  }

  @computed
  get enemyHp() {
    return this._model.enemy.hp;
  }

  @computed
  get heroHp() {
    return this._system.hero.hp;
  }

  @computed
  get battleLog() {
    return this._model.battleLog;
  }
}