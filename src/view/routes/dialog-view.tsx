import * as React from "react";
import { observer } from "mobx-react";

import { DialogController } from "../../model/dialog/dialog-controller";

export const DialogView = observer(
  ({dialog}: {dialog: DialogController}) => {
    return (
      <div className="dialog-bar">
        {dialog.message}
        <ul className="dialog-responses">
          {dialog.responses.map(responseMessage => 
          <li key={responseMessage.message} onClick={responseMessage.callback}>
            {responseMessage.message}
          </li>
          )}
        </ul>
      </div>
    );
  }
);