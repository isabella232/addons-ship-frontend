import { Fragment } from 'react';
import { Base, Text, Icon, Button, ProgressSpinner, Flex } from '@bitrise/bitkit';

import { IPAExportMethod } from '@/models';

import Share from './share';
import css from './style.scss';

type Props = {
  publicInstallPageURL?: string;
  isSplitAPK?: boolean,
  hasUniversalAPK?: boolean,
  shouldEnablePublish: boolean;
  onSave?: () => void;
  onPublish?: () => void;
  appSlug: string;
  ipaExportMethod?: IPAExportMethod;
  hasMounted: boolean;
  isSaving: boolean;
  isPublishInProgress: boolean;
  isPublished: boolean;
};

export default ({
  publicInstallPageURL,
  isSplitAPK,
  hasUniversalAPK,
  shouldEnablePublish,
  onSave,
  onPublish,
  ipaExportMethod,
  appSlug,
  hasMounted,
  isSaving,
  isPublishInProgress,
  isPublished
}: Props) => {
  let publishButtonContent;
  if (isPublished) {
    publishButtonContent = (
      <Fragment>
        <Icon name="Tick" />
        <Text>Published</Text>
      </Fragment>
    );
  } else if (isPublishInProgress) {
    publishButtonContent = (
      <Fragment>
        <ProgressSpinner /> &nbsp; Publishing...
      </Fragment>
    );
  } else {
    publishButtonContent = (
      <Fragment>
        <Icon name="Deployment" />
        <Text>Publish</Text>
      </Fragment>
    );
  }

  return (
    <Flex direction="vertical" gap="x6" className={css.sidebar}>
      <Base>
        <Button level="primary" fullWidth margin="x4" disabled={isSaving} onClick={onSave}>
          {isSaving ? (
            <Fragment>
              <ProgressSpinner /> &nbsp; Saving...
            </Fragment>
          ) : (
            <Fragment>
              <Icon name="Save" />
              <Text>Save</Text>
            </Fragment>
          )}
        </Button>
        <Button
          level="secondary"
          fullWidth
          margin="x4"
          disabled={!shouldEnablePublish || isPublished}
          onClick={onPublish}
        >
          {publishButtonContent}
        </Button>
      </Base>
      <Share
        appSlug={appSlug}
        publicInstallPageURL={publicInstallPageURL}
        isSplitAPK={isSplitAPK}
        hasUniversalAPK={hasUniversalAPK}
        ipaExportMethod={ipaExportMethod}
        hasMounted={hasMounted}
      ></Share>
    </Flex>
  );
};
