import { Dispatch } from 'redux';
import { createAction } from 'deox';

import { ShipAPIService } from '@/services/ship-api';
import { Uploadable } from '@/models/uploadable';
import { RootState } from '@/store';
import { uploadFileToS3 } from '@/utils/file';

import { $ } from './common';
const _uploadFeatureGraphic = (appSlug: string, versionId: string, featureGraphic: Uploadable, file: File) => async (
  dispatch: Dispatch,
  _getState: () => RootState,
  { shipApi }: { shipApi: ShipAPIService }
) => {
  dispatch(uploadFeatureGraphic.next());

  try {
    // Get presigned Urls
    const { uploadUrl } = await shipApi.uploadFeatureGraphic(appSlug, versionId, featureGraphic);

    // Upload images to S3
    await uploadFileToS3(file, uploadUrl);

    // Mark screenshots as uploaded
    await shipApi.uploadedFeatureGraphic(appSlug, versionId);
    dispatch(uploadFeatureGraphic.complete());
  } catch (error) {
    console.error('uploadFeatureGraphic', error);
    dispatch(uploadFeatureGraphic.error(error));
  }
};

const uploadFeatureGraphic = Object.assign(_uploadFeatureGraphic, {
  next: createAction($`UPLOAD_FEATURE_GRAPHIC_NEXT`),
  complete: createAction($`UPLOAD_FEATURE_GRAPHIC_COMPLETE`),
  error: createAction($`UPLOAD_FEATURE_GRAPHIC_ERROR`, resolve => (error: Error) => resolve(error))
});

export default uploadFeatureGraphic;
