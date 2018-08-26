import * as React from "react";
import { observer } from "mobx-react";

import { DialogView } from "./dialog-view";
import { DialogController } from "../../model/dialog/dialog-controller";

export const BasementView = observer(
  ({dialogController}: {dialogController: DialogController}) => {
    return (
      <div id="basement">
        <DialogView dialog={dialogController}/>
      </div>
    );
  }
);