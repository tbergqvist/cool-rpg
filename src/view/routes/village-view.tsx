import * as React from "react";
import { observer } from "mobx-react";

import { System } from "../../model/system";
import { StatusView } from "../status-view";
import { RatQuestState } from "../../model/model";

export const VillageView = observer(
  ({system}: {system: System}) => {

    function onQuestClicked() {
      system.gotoRatGuy();
    }

    function onBasementClicked() {
      system.gotoBasement();
    }
    
    return (
      <div style={{width: "100%", height: "100%"}}>
        <StatusView system={system} wallet={system.wallet} hero={system.hero}/>
        <div id="village">
        {system.quests.ratQuest.state === RatQuestState.Started ? 
          <div className="quest-target2" onClick={onBasementClicked}></div>
          : null
        }
          <div className="quest-target" onClick={onQuestClicked}></div>
        </div>
      </div>
    );
  }
);