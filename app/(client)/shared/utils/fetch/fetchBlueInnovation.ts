import {
  FetchBaseDELETE,
  FetchBaseGET,
  FetchBasePATCH,
  FetchBasePOST,
  FetchBasePUT,
} from "@/app/backend/shared/utils/fetch/fetchBase"
import { ReduxToolKinConstant } from "../../ui/reduxt-toolkit/contants"

export class FetchGETWithoutTokenBlueI extends FetchBaseGET {
  getUrlComplete() {
    return (
      process.env.NEXT_PUBLIC_BLUE_INNOVATION_SERVICE_URL +
      this.url +
      this.getSufixSearchParamas()
    )
  }

  async getToken() {
    return ""
  }

  async getOptions() {
    return {
      method: "GET",
      headers: await this.getHeaders(),
    }
  }
}

export class FetchGETTokenBlueI extends FetchBaseGET {
  getUrlComplete() {
    return (
      process.env.NEXT_PUBLIC_BLUE_INNOVATION_SERVICE_URL +
      this.url +
      this.getSufixSearchParamas()
    )
  }

  async getToken() {
    const data = JSON.parse(
      localStorage.getItem(ReduxToolKinConstant.localStorage.keyData) || ""
    )
    return `Bearer ${data?.accessToken}`
  }

  async getOptions() {
    return {
      method: "GET",
      headers: await this.getHeaders(),
    }
  }
}

export class FetchPOSTTokenBlueI extends FetchBasePOST {
  getUrlComplete() {
    return process.env.NEXT_PUBLIC_BLUE_INNOVATION_SERVICE_URL + this.url
  }

  async getToken() {
    const data = JSON.parse(
      localStorage.getItem(ReduxToolKinConstant.localStorage.keyData) || ""
    )
    return `Bearer ${data?.accessToken}`
  }

  async getOptions() {
    return {
      method: "POST",
      headers: await this.getHeaders(),
      body: this.getBody(),
    }
  }
}

export class FetchPUTTokenBlueI extends FetchBasePUT {
  getUrlComplete() {
    return process.env.NEXT_PUBLIC_BLUE_INNOVATION_SERVICE_URL + this.url
  }

  async getToken() {
    const data = JSON.parse(
      localStorage.getItem(ReduxToolKinConstant.localStorage.keyData) || ""
    )
    return `Bearer ${data?.accessToken}`
  }

  async getOptions() {
    return {
      method: "PUT",
      headers: await this.getHeaders(),
      body: this.getBody(),
    }
  }
}

export class FetchPATCHTokenBlueI extends FetchBasePATCH {
  getUrlComplete() {
    return process.env.NEXT_PUBLIC_BLUE_INNOVATION_SERVICE_URL + this.url
  }

  async getToken() {
    const data = JSON.parse(
      localStorage.getItem(ReduxToolKinConstant.localStorage.keyData) || ""
    )
    return `Bearer ${data?.accessToken}`
  }

  async getOptions() {
    return {
      method: "PATCH",
      headers: await this.getHeaders(),
      body: this.getBody(),
    }
  }
}

export class FetchDELETETokenBlueI extends FetchBaseDELETE {
  getUrlComplete() {
    return process.env.NEXT_PUBLIC_BLUE_INNOVATION_SERVICE_URL + this.url
  }

  async getToken() {
    const data = JSON.parse(
      localStorage.getItem(ReduxToolKinConstant.localStorage.keyData) || ""
    )
    return `Bearer ${data?.accessToken}`
  }

  async getOptions() {
    return {
      method: "DELETE",
      headers: await this.getHeaders(),
    }
  }
}
