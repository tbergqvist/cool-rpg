interface EnemyAction {
  name: string;
  minDamage: number;
  maxDamage: number;
}

export interface Enemy {
  name: string;
  hp: number;
  actions: EnemyAction[];
}

export enum EnemyId {
  Rat = 0,
}

let enemies: {[id: number]: Enemy} = {
  [EnemyId.Rat]: {
    name: "Rat",
    hp: 5,
    actions: [{
      minDamage: 1,
      maxDamage: 2,
      name: "Bite"
    }]
  }
}

export namespace Data {
  export function getEnemy(id: EnemyId): Enemy {
    return enemies[id];
  }
}

