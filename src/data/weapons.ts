export const enum WeaponType {
  Unarmed,
  Melee,
  Ranged
}

export enum WeaponId {
  Hands = 0,
}

export interface Weapon {
  minDamage: number;
  maxDamage: number;
  type: WeaponType;
}

let items: {[id: number]: Weapon} = {
  [WeaponId.Hands]: {
    minDamage: 1,
    maxDamage: 2,
    type: WeaponType.Unarmed
  }
}

export namespace Data {
  export function getWeapon(id: WeaponId): Weapon {
    return items[id];
  }
}

