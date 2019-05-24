import fetch, { Request, RequestInit, Response } from 'node-fetch';
import { AppVersion, AppVersionList } from '@/models';

export type Fetch = (url: string | Request, init?: RequestInit) => Promise<Response>;
export type APIConfig = {
  url: string;
};

class APIService {
  constructor(private fetch: Fetch, private config: APIConfig) {}

  async getAppVersionList(appSlug: string): Promise<AppVersionList> {
    const resp = await {
      data: [
        {
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
          size: 4567034,
          supported_device_types: ['iphone', 'ipad'],
          distribution_type: 'development',
          icon_url: 'http://placekitten.com/160/160',
          app_name: 'Standup Timer',
          promotional_text: 'Promotional Text',
          keywords: 'Keywords',
          review_notes: 'Review Notes',
          support_url: 'https://bitrise.io/support',
          marketing_url: 'https://bitrise.io/marketing',
          scheme: 'piramid',
          configuration: 'canary'
        },
        {
          id: 123,
          version: '1.0.3',
          platform: 'ios',
          build_number: '31',
          build_slug: '13245ads',
          last_update: '2018-09-22T12:42:31Z',
          description: 'Some semi-long description',
          whats_new: 'Some longer whats-new',
          minimum_os: '10.2',
          minimum_sdk: 'dunno',
          package_name: 'com.package.name',
          certificate_expires: '2018-09-21T12:42:31Z',
          bundle_id: 'bundle-id',
          size: 4567034,
          supported_device_types: ['iphone', 'ipad'],
          distribution_type: 'development',
          icon_url: 'http://placekitten.com/160/160',
          app_name: 'Standup Timer',
          promotional_text: 'Promotional Text',
          keywords: 'Keywords',
          review_notes: 'Review Notes',
          support_url: 'https://bitrise.io/support',
          marketing_url: 'https://bitrise.io/marketing',
          scheme: 'piramid',
          configuration: 'canary'
        },
        {
          id: 123,
          version: '1.0.3',
          platform: 'ios',
          build_number: '30',
          build_slug: '13245ads',
          last_update: '2018-09-22T12:42:31Z',
          description: 'Some semi-long description',
          whats_new: 'Some longer whats-new',
          minimum_os: '10.2',
          minimum_sdk: 'dunno',
          package_name: 'com.package.name',
          certificate_expires: '2018-09-20T12:42:31Z',
          bundle_id: 'bundle-id',
          size: 4567034,
          supported_device_types: ['iphone', 'ipad'],
          distribution_type: 'development',
          icon_url: 'http://placekitten.com/160/160',
          app_name: 'Standup Timer',
          promotional_text: 'Promotional Text',
          keywords: 'Keywords',
          review_notes: 'Review Notes',
          support_url: 'https://bitrise.io/support',
          marketing_url: 'https://bitrise.io/marketing',
          scheme: 'piramid',
          configuration: 'canary'
        },
        {
          id: 123,
          version: '1.0.2',
          platform: 'ios',
          build_number: '29',
          build_slug: '13245ads',
          last_update: '2018-09-22T12:42:31Z',
          description: 'Some semi-long description',
          whats_new: 'Some longer whats-new',
          minimum_os: '10.2',
          minimum_sdk: 'dunno',
          package_name: 'com.package.name',
          certificate_expires: '2018-09-29T12:42:31Z',
          bundle_id: 'bundle-id',
          size: 4567034,
          supported_device_types: ['iphone', 'ipad'],
          distribution_type: 'development',
          icon_url: 'http://placekitten.com/160/160',
          app_name: 'Standup Timer',
          promotional_text: 'Promotional Text',
          keywords: 'Keywords',
          review_notes: 'Review Notes',
          support_url: 'https://bitrise.io/support',
          marketing_url: 'https://bitrise.io/marketing',
          scheme: 'piramid',
          configuration: 'canary'
        },
        {
          id: 123,
          version: '1.0.2',
          platform: 'ios',
          build_number: '28',
          build_slug: '13245ads',
          last_update: '2018-09-22T12:42:31Z',
          description: 'Some semi-long description',
          whats_new: 'Some longer whats-new',
          minimum_os: '10.2',
          minimum_sdk: 'dunno',
          package_name: 'com.package.name',
          certificate_expires: '2018-09-28:42:31Z',
          bundle_id: 'bundle-id',
          size: 4567034,
          supported_device_types: ['iphone', 'ipad'],
          distribution_type: 'development',
          icon_url: 'http://placekitten.com/160/160',
          app_name: 'Standup Timer',
          promotional_text: 'Promotional Text',
          keywords: 'Keywords',
          review_notes: 'Review Notes',
          support_url: 'https://bitrise.io/support',
          marketing_url: 'https://bitrise.io/marketing',
          scheme: 'piramid',
          configuration: 'canary'
        }
      ]
    };

    const { data } = resp;

    const versions = data
      .map(appVersionData => appVersionData.version)
      .filter(function(version, index, list) {
        return index === list.indexOf(version);
      });

    return versions.map(version => {
      return {
        version: version,
        apps: data.filter(appVersionData => appVersionData.version === version).map(appVersionData => ({
          id: appVersionData.id,
          version: appVersionData.version,
          platform: appVersionData.platform,
          buildNumber: parseInt(appVersionData.build_number, 10),
          buildSlug: appVersionData.build_slug,
          lastUpdate: new Date(appVersionData.last_update),
          description: appVersionData.description,
          whatsNew: appVersionData.whats_new,
          minimumOs: appVersionData.minimum_os,
          minimumSdk: appVersionData.minimum_sdk,
          packageName: appVersionData.package_name,
          certificateExpires: new Date(appVersionData.certificate_expires),
          bundleId: appVersionData.bundle_id,
          size: appVersionData.size,
          supportedDeviceTypes: appVersionData.supported_device_types,
          distributionType: appVersionData.distribution_type,
          iconUrl: appVersionData.icon_url,
          appName: appVersionData.app_name,
          promotionalText: appVersionData.promotional_text,
          keywords: appVersionData.keywords,
          reviewNotes: appVersionData.review_notes,
          supportUrl: appVersionData.support_url,
          marketingUrl: appVersionData.marketing_url,
          scheme: appVersionData.scheme,
          configuration: appVersionData.configuration
        }))
      }});
  }

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
        size: 4567034,
        supported_device_types: ['iphone', 'ipad'],
        distribution_type: 'development',
        icon_url: 'http://placekitten.com/160/160',
        app_name: 'Standup Timer',
        promotional_text: 'Promotional Text',
        keywords: 'Keywords',
        review_notes: 'Review Notes',
        support_url: 'https://bitrise.io/support',
        marketing_url: 'https://bitrise.io/marketing',
        scheme: 'piramid',
        configuration: 'canary'
      }
    };

    const { data } = resp;

    return {
      id: data.id,
      version: data.version,
      platform: data.platform,
      buildNumber: parseInt(data.build_number, 10),
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
      distributionType: data.distribution_type,
      iconUrl: data.icon_url,
      appName: data.app_name,
      promotionalText: data.promotional_text,
      keywords: data.keywords,
      reviewNotes: data.review_notes,
      supportUrl: data.support_url,
      marketingUrl: data.marketing_url,
      scheme: data.scheme,
      configuration: data.configuration
    };
  }
}

export default new APIService(fetch, {
  url: 'todo: get from config'
});
