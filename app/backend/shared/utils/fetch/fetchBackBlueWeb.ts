import { FetchBasePOST } from "./fetchBase"

export class FetchBackPOSTTokenBlueW extends FetchBasePOST {
  async getToken() {
    return ""
  }

  async getOptions() {
    return {
      method: "POST",
      headers: await this.getHeaders(),
      body: this.getBody(),
    }
  }
}
