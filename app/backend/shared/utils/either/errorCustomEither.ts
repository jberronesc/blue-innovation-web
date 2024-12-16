export abstract class Result {
  public kind: string = ""

  constructor(
    readonly status: number = 0,
    readonly code: string = "",
    readonly message: string = "",
    readonly data: { [x: string]: any } = {}
  ) {}
}

export abstract class ErrorResult extends Result {}

export class ErrorDefault extends ErrorResult {
  public kind: string = "ErrorDefault"

  constructor(
    readonly status: number = 0,
    readonly code: string = "",
    readonly message: string = "",
    readonly data: { [x: string]: any } = {}
  ) {
    super(status, code, message, data)
  }
}

export class ErrorNotFound extends ErrorResult {
  public kind: string = "ErrorNotFound"
}

export class SuccessResult extends Result {
  public kind: string = "SuccessResult"

  constructor(
    readonly status: number = 0,
    readonly code: string = "",
    readonly message: string = "",
    readonly data: { [x: string]: any } = {}
  ) {
    super(status, code, message, data)
  }
}
