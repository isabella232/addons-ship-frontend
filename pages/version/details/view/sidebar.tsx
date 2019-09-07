import { Fragment } from 'react';
import { Base, Text, Icon, Button, ProgressSpinner } from '@bitrise/bitkit';

import { IPAExportMethod } from '@/models';

import Share from './share';
import css from './style.scss';

type Props = {
  publicInstallPageURL?: string;
  shouldEnablePublish: boolean;
  onSave?: () => void;
  onPublish?: () => void;
  buildSlug: string;
  ipaExportMethod?: IPAExportMethod;
  hasMounted: boolean;
  isSaving: boolean;
  isPublishInProgress: boolean;
  isPublished: boolean;
};

export default ({
  publicInstallPageURL,
  shouldEnablePublish,
  onSave,
  onPublish,
  ipaExportMethod,
  buildSlug,
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

  const prettyIPAExportMethod = (ipaExportMethod: IPAExportMethod) => {
    switch (ipaExportMethod) {
      case 'app-store':
        return 'App Store';
      case 'development':
        return 'Development';
      case 'enterprise':
        return 'Enterprise';
      case 'ad-hoc':
        return 'Ad-hoc';
    }
  };

  return (
    <Base maxWidth="16rem" className={css.sidebar}>
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
        buildSlug={buildSlug}
        publicInstallPageURL={publicInstallPageURL}
        ipaExportMethod={ipaExportMethod}
        hasMounted={hasMounted}
      ></Share>
    </Base>
  );
};
