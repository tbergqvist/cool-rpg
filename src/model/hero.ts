import { computed, action } from "mobx";
import { HeroModel } from "./model";
import { Logger } from "../logger";
import { Data, WeaponType } from "../data/weapons";

export class Hero {
  constructor(
    private _model: HeroModel
  ) {
  }

  init(name: string) {
    this._model.name = name;
  }

  @computed
  get name() {
    return this._model.name;
  }

  @computed
  private get equippedWeapon() {
    return Data.getWeapon(this._model.equipment.weaponId);
  }

  @computed
  get hp() {
    return this._model.hp;
  }

  @action
  takeDamage(damage: number) {
    this._model.hp -= damage;
  }

  @computed
  get attackPower() {
    switch (this.equippedWeapon.type) {
      case WeaponType.Unarmed:
        return this._model.skills.unarmed;
      case WeaponType.Melee:
        return this._model.skills.meleeWeapons;
      case WeaponType.Ranged:
        return this._model.skills.rangedWeapons;
      default:
        Logger.error(`unknown weaponType ${this.equippedWeapon.type}`);
        return 0;
    }
  }
}