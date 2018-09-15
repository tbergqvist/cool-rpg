import * as React from "react";
import { observer } from "mobx-react";
import { Fight } from "../../model/fight";

export const FightView = observer(
  ({fight}: {fight: Fight}) => {
    function onButtonClicked() {
      fight.playerAttack();
    }

    return (
      <div id="fight">
        <span>HP: {fight.enemyHp}</span>
        <button onClick={onButtonClicked}>Attack!</button>
      </div>
    );
  }
);