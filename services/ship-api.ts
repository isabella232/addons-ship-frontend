import fetch from "node-fetch";

import { AppVersion } from "@/models";
import { Fetch, APIConfig } from "@/models/services";
import { mockAppVersion } from "@/mocks";
import { snakifyKeys, camelizeKeys } from "@/utils";

class ShipAPIService {
  constructor(private fetch: Fetch, private config: APIConfig) {}

  async getAppVersion(appSlug: string, versionId: string): Promise<AppVersion> {
    const resp = await {
      data: snakifyKeys<any>(mockAppVersion)
    };

    const { data } = resp;
    return {
      ...camelizeKeys(data),
      publicInstallPageURL: data.public_install_page_url
    };
  }
}

export default new ShipAPIService(fetch, {
  url: "todo: get from config"
});
