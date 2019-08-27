jest.mock('@/services/ship-api');
jest.mock('@/utils/file');

import configureMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { TestScheduler } from 'rxjs/testing';
import { getType } from 'deox';

import { mockAppVersion, mockUploadedScreenshotResponse } from '@/mocks';
import { AppVersion, AppVersionEvent } from '@/models';
import api, { ShipAPIService } from '@/services/ship-api';
import { uploadFileToS3 } from '@/utils/file';
import { Uploadable } from '@/models/uploadable';

import reducer, {
  fetchAppVersion,
  updateAppVersion,
  uploadScreenshots,
  uploadFeatureGraphic,
  publishAppVersion,
  pollPublishStatus,
  pollPublishStatusEpic,
  deleteScreenshot
} from '.';

describe('appVersion', () => {
  let mockStore: MockStoreCreator, store: MockStoreEnhanced;
  beforeEach(() => {
    mockStore = configureMockStore([thunk.withExtraArgument({ shipApi: api })]);
    store = mockStore();
  });

  describe('reducer', () => {
    it('loads an app version', () => {
      const state = reducer(undefined, fetchAppVersion.complete(mockAppVersion));

      expect(state).toMatchSnapshot();
    });

    test('when publishing started', () => {
      const state = reducer(undefined, publishAppVersion.next() as any);

      expect(state).toMatchSnapshot();
    });

    test('when publishing is done', () => {
      const state = reducer(undefined, publishAppVersion.complete() as any);

      expect(state).toMatchSnapshot();
    });

    test('when publishing had an error', () => {
      const state = reducer(undefined, publishAppVersion.complete() as any);

      expect(state).toMatchSnapshot();
    });

    test('when publish polling has results', () => {
      const state = reducer(
        undefined,
        pollPublishStatus.complete([
          { status: 'in-progress', createdAt: new Date('2019-07-08') },
          { status: 'finished', createdAt: new Date('2019-07-09') }
        ] as AppVersionEvent[])
      );

      expect(state).toMatchSnapshot();
    });
  });

  describe('fetchAppVersion', () => {
    it('fetches an app version', async () => {
      (api.getAppVersion as jest.Mock).mockResolvedValueOnce(mockAppVersion);
      (api.getScreenshots as jest.Mock).mockResolvedValueOnce([mockUploadedScreenshotResponse]);
      await store.dispatch(fetchAppVersion('app-slug', 'version-id') as any);

      expect(store.getActions()).toMatchSnapshot();
    });

    it("can't fetch an app version", async () => {
      (api.getAppVersion as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(fetchAppVersion('app-slug', 'version-id') as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('updateAppVersion', () => {
    const updatedAppVersion: AppVersion = { ...mockAppVersion, description: 'Some different description' };

    it('updates an app version', async () => {
      await store.dispatch(updateAppVersion(updatedAppVersion) as any);

      expect(store.getActions()).toMatchSnapshot();
    });

    it("can't update an app version", async () => {
      (api.updateAppVersion as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(updateAppVersion(updatedAppVersion) as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('uploadScreenshots', () => {
    it('uploads screenshots', async () => {
      const filename = 'a-file.jpg',
        bits = 'whatever',
        uploadUrl = 'http://some.url?token';
      (api.uploadScreenshots as jest.Mock).mockResolvedValueOnce([
        {
          filename,
          filesize: bits.length,
          uploadUrl
        }
      ]);

      const file = new File([bits], filename);
      await store.dispatch(uploadScreenshots('app-slug', 'version-id', [], [file]) as any);

      expect(api.uploadScreenshots).toHaveBeenCalledWith('app-slug', 'version-id', []);
      expect(uploadFileToS3).toHaveBeenCalledWith(file, uploadUrl);
      expect(api.uploadedScreenshots).toHaveBeenCalledWith('app-slug', 'version-id');
      expect(store.getActions()).toMatchSnapshot();
    });

    it("can't upload screenshots", async () => {
      (api.uploadScreenshots as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(uploadScreenshots('app-slug', 'version-id', [], []) as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('deleteScreenshot', () => {
    it('deletes a screenshot', async () => {
      const appSlug = 'app-slug',
        versionId = 'version-id',
        screenshoId = 'screenshot-id';
      await store.dispatch(deleteScreenshot(appSlug, versionId, screenshoId) as any);

      expect(api.deleteScreenshot).toHaveBeenCalledWith(appSlug, versionId, screenshoId);
      expect(store.getActions).toMatchSnapshot();
    });

    it("can't delete a screenshot", async () => {
      (api.deleteScreenshot as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(deleteScreenshot('appSlug', 'versionId', 'screenshoId') as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('uploadFeatureGraphic', () => {
    it('uploads a feature graphic', async () => {
      const filename = 'a-file.jpg',
        bits = 'whatever',
        uploadUrl = 'http://some.url?token';
      (api.uploadFeatureGraphic as jest.Mock).mockResolvedValueOnce([
        {
          filename,
          filesize: bits.length,
          uploadUrl
        }
      ]);

      const file = new File([bits], filename);
      await store.dispatch(uploadFeatureGraphic('app-slug', 'version-id', {} as Uploadable, file) as any);

      expect(api.uploadFeatureGraphic).toHaveBeenCalledWith('app-slug', 'version-id', {});
      expect(uploadFileToS3).toHaveBeenCalledWith(file, uploadUrl);
      expect(api.uploadedFeatureGraphic).toHaveBeenCalledWith('app-slug', 'version-id');
      expect(store.getActions()).toMatchSnapshot();
    });

    it("can't upload a feature graphic", async () => {
      (api.uploadFeatureGraphic as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(uploadFeatureGraphic('app-slug', 'version-id', {} as Uploadable, {} as File) as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('publishAppVersion', () => {
    it('publishes an app version', async () => {
      await store.dispatch(publishAppVersion(mockAppVersion) as any);

      expect(store.getActions()).toMatchSnapshot();
    });

    it("can't publishe an app version", async () => {
      (api.publishAppVersion as jest.Mock).mockRejectedValueOnce('api had some issue');
      await store.dispatch(publishAppVersion(mockAppVersion) as any);

      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('pollPublishStatus', () => {
    const testScheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));

    it('does not start polling for other actions', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const action$ = cold('a', { a: { type: 'SOME_OTHER_ACTION' } });

        const output$ = pollPublishStatusEpic(action$ as any, null as any, {} as any);

        expectObservable(output$).toBe('');
      });
    });

    it('starts polling', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const action$ = cold('a 3s b', {
          a: { type: getType(pollPublishStatus.start), payload: mockAppVersion },
          b: pollPublishStatus.cancel
        });

        const expected = '1s b 999ms b 999ms b';
        const values = {
          a: { type: getType(pollPublishStatus.start) },
          b: { type: getType(pollPublishStatus.complete), payload: ['event1', 'event2'] }
        };

        const dependencies = {
          shipApi: ({
            getAppVersionEvents: () =>
              cold('a', {
                a: ['event1', 'event2']
              })
          } as unknown) as ShipAPIService
        };

        expectObservable(pollPublishStatusEpic(action$, null as any, dependencies)).toBe(expected, values);
      });
    });
  });
});
