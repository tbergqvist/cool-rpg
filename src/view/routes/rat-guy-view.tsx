import * as React from "react";
import { observer } from "mobx-react";

import { System } from "../../model/system";
import { RatQuestState } from "../../model/quests/rat-quest";

export const RatGuyView = observer(
  ({system}: {system: System}) => {

    function onByeClicked() {
      system.gotoVillage();
    }

    function onQuestAcceptedClicked() {
      system.quests.ratQuest.start();
      system.gotoVillage();
    }

    function dialog() {
      switch(system.quests.ratQuest.state) {
        case RatQuestState.NotStarted: 
          return "My basement is filled with rats, please help me!";
        case RatQuestState.Started: 
          return "Please go to my basement and deal with the rats!";
        case RatQuestState.Started: 
            return "Please go to my basement and deal with the rats!";
        default:
          return "I'm an invalid state";
      }
    }

    return (
      <div id="rat-guy">
        <div className="dialog-bar">
          {dialog()}
          <ul className="dialog-responses">
            {system.quests.ratQuest.state === RatQuestState.NotStarted ? 
            <li onClick={onQuestAcceptedClicked}>
              OK
            </li>
            : null
            }
            <li onClick={onByeClicked}>
              Bye
            </li>
          </ul>
        </div>
      </div>
    );
  }
);