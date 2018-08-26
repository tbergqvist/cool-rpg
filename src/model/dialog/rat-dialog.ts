import { RatQuest } from "../quests/rat-quest";
import { System } from "../system";
import { DialogMessage, DialogResponseTuple, message } from "./dialog-controller";

export function ratDialog(system: System, ratQuest: RatQuest): () => DialogMessage {
  const byeMessage: DialogResponseTuple = ["Bye", () => system.gotoVillage() || undefined];

  return () => message("Hi dude!", [
    ["(Kill rat)", killRat],
    ["Please leave, Mr Rat", leaveRat],
    byeMessage,
  ]);

  function killRat() {
    ratQuest.killRat();
    system.gotoVillage();
    return message("WAAAAAA!!! (rat dies horribly)", [byeMessage]);
  }

  function leaveRat() {
    system.quests.ratQuest.letRatLeave();
    system.gotoVillage();
    return message("Cheers mate!", [byeMessage]);
  }
}