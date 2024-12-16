import { auth } from "@/auth";
import { FetchBaseGET, FetchBasePOST } from "./fetchBase";

export class FetchBackGETWithoutTokenBlueI extends FetchBaseGET {
  getUrlComplete() {
    return (
      process.env.BLUE_INNOVATION_SERVICE_URL +
      this.url +
      this.getSufixSearchParamas()
    );
  }

  async getToken() {
    return "";
  }

  async getOptions() {
    return {
      method: "GET",
      headers: await this.getHeaders(),
    };
  }
}

export class FetchBackGETTokenBlueI extends FetchBaseGET {
  getUrlComplete() {
    return (
      process.env.BLUE_INNOVATION_SERVICE_URL +
      this.url +
      this.getSufixSearchParamas()
    );
  }

  async getToken() {
    const session = await auth();

    return `Bearer ${session?.token}`;
  }

  async getOptions() {
    return {
      method: "GET",
      headers: await this.getHeaders(),
    };
  }
}

export class FetchBackPOSTWithoutTokenBlueI extends FetchBasePOST {
  getUrlComplete() {
    return process.env.BLUE_INNOVATION_SERVICE_URL + this.url;
  }

  async getToken() {
    return "";
  }

  async getOptions() {
    return {
      method: "POST",
      headers: await this.getHeaders(),
      body: this.getBody(),
    };
  }
}

export class FetchBackPOSTTokenBlueI extends FetchBasePOST {
  getUrlComplete() {
    return process.env.BLUE_INNOVATION_SERVICE_URL + this.url;
  }

  async getToken() {
    const session = await auth();

    return `Bearer ${session?.token}`;
  }

  async getOptions() {
    return {
      method: "POST",
      headers: await this.getHeaders(),
      body: this.getBody(),
    };
  }
}
