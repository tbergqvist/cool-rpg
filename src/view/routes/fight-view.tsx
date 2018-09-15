import * as React from "react";
import { observer } from "mobx-react";
import { Fight } from "../../model/fight";

export const FightView = observer(
  ({fight}: {fight: Fight}) => {
    function onButtonClicked() {
      fight.playerAction();
    }

    return (
      <div id="fight">
        <div>
          <span>HP: {fight.enemyHp}</span>
        </div>
        <div>
          <span>HP: {fight.heroHp}</span>
        </div>
        <button onClick={onButtonClicked}>Attack!</button>

        <div>
          {fight.battleLog.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </div>
      </div>
    );
  }
);