import { cache } from "react";
import { Either } from "../either/either";
import { ErrorDefault, SuccessResult } from "../either/errorCustomEither";
import {
  FetchBaseParams,
  FetchParamsDELETE,
  FetchParamsGET,
  FetchParamsPOST,
} from "./interfaces/fetch-base-params";

export default class FetchBase {
  protected url: string;
  protected configExtra?: { [x: string]: any };

  constructor({ url, configExtra }: FetchBaseParams) {
    this.url = url;
    this.configExtra = configExtra;
  }

  async exec(): Promise<Either<ErrorDefault, SuccessResult>> {
    try {
      const response = await this.getFetch();

      const status = response.status;

      if (!response.ok) throw response;

      const responseJson = await response.json();

      return Either.right(
        new SuccessResult(
          status,
          responseJson?.code || "",
          responseJson.message,
          responseJson,
        ),
      );
    } catch (error) {
      return Either.left((await this.handleError(error)).getLeft());
    }
  }

  async execWithoutResponse(): Promise<Either<ErrorDefault, SuccessResult>> {
    try {
      const body = (await this.getOptions())?.body;
      console.log({
        msg: "FETCH BASE - DATOS ENVIADOS",
        url: this.getUrlComplete(),
        body,
        bodyParse: body && JSON.parse(body),
      });

      const response = await this.getFetch();

      const status = response.status;

      if (!response.ok) throw response;

      return Either.right(
        new SuccessResult(status, "", response.statusText, {}),
      );
    } catch (error) {
      return Either.left((await this.handleError(error)).getLeft());
    }
  }

  private async getFetch() {
    /*
    console.log({
      msg: "FETCH BASE",
      getUrlComplete: this.getUrlComplete(),
      getOptions: await this.getOptions(),
    })
    */

    return await fetch(this.getUrlComplete(), {
      cache: "no-store",
      ...(await this.getOptions()),
    });
  }

  private async handleError(error: unknown) {
    /*
    console.log({
      msg: "FETCH BASE HANDLER ERROR",
      value: error,
    })
    */

    try {
      if (error instanceof Response) {
        let responseJson: {
          message?: string;
          code?: string;
          errors: [];
        } = {
          errors: [],
        };

        let message: string | undefined = "";

        try {
          responseJson = await error.json();
          message = responseJson?.message;
        } catch (errorParse) {
          message = error.statusText;
        }

        console.log({
          msg: "FETCH BASE - ERROR RESPONSE",
          value: responseJson,
        });

        return Either.left(
          new ErrorDefault(
            error.status,
            responseJson.code || "",
            message,
            responseJson,
          ),
        );
      }

      console.log("Sin internet");

      return Either.left(
        new ErrorDefault(0, "ERROR_NETWORK", "Error de red", {}),
      );
    } catch (errorUnknown) {
      return Either.left(
        new ErrorDefault(0, "ERROR_UNKNOWN", "Error de desconocido", {}),
      );
    }
  }

  protected getUrlComplete() {
    return this.url;
  }

  protected async getOptions(): Promise<{ [x: string]: any }> {
    throw new Error("You have to implement the method!");
  }

  protected async getToken(): Promise<string> {
    throw new Error("You have to implement the method!");
  }

  protected async getHeaders() {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `${await this.getToken()}`,
    };
  }
}

export class FetchBaseGET extends FetchBase {
  protected shearhParams?: { [x: string]: any };

  constructor(params: FetchParamsGET) {
    super(params);
    this.shearhParams = params.shearhParams;
  }

  getSufixSearchParamas() {
    const urlSearchParams = new URLSearchParams(this.shearhParams);
    return urlSearchParams.size > 0 ? "?" + urlSearchParams.toString() : "";
  }
}

export class FetchBasePOST extends FetchBase {
  protected readonly body: { [x: string]: any };

  constructor(params: FetchParamsPOST) {
    super(params);
    this.body = params.body;
  }

  getBody() {
    return JSON.stringify(this.body);
  }
}

export class FetchBasePUT extends FetchBase {
  protected readonly body: { [x: string]: any };

  constructor(params: FetchParamsPOST) {
    super(params);
    this.body = params.body;
  }

  getBody() {
    return JSON.stringify(this.body);
  }
}

export class FetchBasePATCH extends FetchBase {
  protected readonly body: { [x: string]: any };

  constructor(params: FetchParamsPOST) {
    super(params);
    this.body = params.body;
  }

  getBody() {
    return JSON.stringify(this.body);
  }
}

export class FetchBaseDELETE extends FetchBase {
  constructor(params: FetchParamsDELETE) {
    super(params);
  }
}
