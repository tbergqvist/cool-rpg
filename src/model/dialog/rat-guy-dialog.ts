import { RatQuest, RatQuestState } from "../quests/rat-quest";
import { System } from "../system";
import { DialogMessage, message, DialogResponseTuple } from "./dialog-controller";

export function ratGuyDialog(system: System, ratQuest: RatQuest): () => DialogMessage {
  const byeMessage: DialogResponseTuple = ["Bye", () => system.gotoVillage() || undefined];

  return () => {
    switch (ratQuest.state) {
      case RatQuestState.NotStarted:
        return questNotStarted();
      case RatQuestState.Started:
        return questStarted();
      default:
        return message("Nice", [byeMessage]);
    }
  }

  function questNotStarted() {
    return message(
      "My basement is filled with rats, please help me!", [
        ["Ok", acceptQuest],
        byeMessage
      ]
    );

    function acceptQuest() {
      ratQuest.start();
      return message("Thanks man!", [byeMessage]);
    }
  }

  function questStarted() {
    return message(
      "Please go to my basement and deal with the rats!", [
        byeMessage
      ]
    );
  }
}

