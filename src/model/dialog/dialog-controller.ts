import { computed, observable, action } from "mobx";

interface DialogResponse {
  message: string;
  callback(): DialogMessage | undefined;
}

export interface DialogMessage {
  message: string;
  responses: DialogResponse[];
}

export type DialogResponseTuple = [string, () => DialogMessage | undefined];

export function message(message: string, responses: DialogResponseTuple[]): DialogMessage {
  return { message, responses: responses.map(t => ({ message: t[0], callback: t[1] })) };
}

export class DialogController {
  @observable private _message: string = "";
  @observable private _responses: { message: string, callback: () => void }[] = [];

  constructor(
    dialog: () => DialogMessage
  ) {
    this.next(dialog);
  }

  @action
  private next(getDialog: () => (DialogMessage | undefined)) {
    let value = getDialog();
    if (!value) {
      this._message = "";
      this._responses = [];
      return;
    }

    let { message, responses } = value;
    this._message = message;
    this._responses = responses.map(r => ({ message: r.message, callback: () => this.next(r.callback) }));
  }

  @computed
  get message() {
    return this._message;
  }

  @computed
  get responses() {
    return this._responses;
  }
}