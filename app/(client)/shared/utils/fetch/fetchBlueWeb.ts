import { FetchBasePOST } from "@/app/backend/shared/utils/fetch/fetchBase"

export class FetchPOSTTokenBlueW extends FetchBasePOST {
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
