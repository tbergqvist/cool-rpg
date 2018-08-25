import * as React from "react";
import { observer } from "mobx-react";

import { System } from "../../model/system";
import { RatQuestState } from "../../model/quests/rat-quest";

export const VillageView = observer(
  ({system}: {system: System}) => {

    function onQuestClicked() {
      system.gotoRatGuy();
    }

    function onBasementClicked() {
      system.gotoBasement();
    }

    return (
      <div id="village">
      {system.quests.ratQuest.state === RatQuestState.Started ? 
        <div className="quest-target2" onClick={onBasementClicked}></div>
        : null
      }
        <div className="quest-target" onClick={onQuestClicked}></div>
      </div>
    );
  }
);