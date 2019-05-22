import fetch, { Request, RequestInit, Response } from 'node-fetch';
import { AppVersion } from '@/models';

export type Fetch = (url: string | Request, init?: RequestInit) => Promise<Response>;
export type APIConfig = {
  url: string;
};

class APIService {
  constructor(private fetch: Fetch, private config: APIConfig) {}

  async getAppVersion(appSlug: string, versionId: string): Promise<AppVersion> {
    const resp = await {
      data: {
        id: 123,
        version: '1.0.3',
        platform: 'ios',
        build_number: '32',
        build_slug: '13245ads',
        last_update: '2018-09-22T12:42:31Z',
        description: 'Some semi-long description',
        whats_new: 'Some longer whats-new',
        minimum_os: '10.2',
        minimum_sdk: 'dunno',
        package_name: 'com.package.name',
        certificate_expires: '2018-09-22T12:42:31Z',
        bundle_id: 'bundle-id',
        size: 45670,
        supported_device_types: ['iphone', 'ipad'],
        distribution_type: 'development'
      }
    };

    const { data } = resp;

    return {
      id: data.id,
      version: data.version,
      platform: data.platform,
      buildNumber: data.build_number,
      buildSlug: data.build_slug,
      lastUpdate: new Date(data.last_update),
      description: data.description,
      whatsNew: data.whats_new,
      minimumOs: data.minimum_os,
      minimumSdk: data.minimum_sdk,
      packageName: data.package_name,
      certificateExpires: new Date(data.certificate_expires),
      bundleId: data.bundle_id,
      size: data.size,
      supportedDeviceTypes: data.supported_device_types,
      distributionType: data.distribution_type
    };
  }
}

export default new APIService(fetch, {
  url: 'todo: get from config'
});
