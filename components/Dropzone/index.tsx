import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, Base, Flex, Text, Icon } from '@bitrise/bitkit';
import cx from 'classnames';

import css from './style.scss';
import { Screenshot } from '@/models';

type Props = {
  onFilesAdded: (files: File[]) => void;
  removeFile: (file: Screenshot) => void;
  screenshots?: Screenshot[];
  isMultiple?: boolean;
  instructionsBeginning?: string;
  instructionsAction?: string;
};

export default ({
  onFilesAdded,
  removeFile,
  screenshots = [],
  isMultiple = true,
  instructionsBeginning = 'Drag & Drop',
  instructionsAction = 'Browse Files'
}: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAdded(acceptedFiles);
    },
    [onFilesAdded, removeFile, screenshots]
  );

  const thumbs = screenshots.map((screenshot: Screenshot, index: number) => (
    <Base paddingHorizontal="x3" key={index} container className={css.thumbnailContainer}>
      <div className={css.removeIcon} onClick={() => removeFile(screenshot)}>
        <Icon name="CloseSmall" color="white" />
      </div>
      <Base Component="img" src={screenshot.url()} className={css.thumbnail}/>
    </Base>
  ));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: isMultiple
  });

  const hasFiles = screenshots.length > 0;

  return (
    <Card>
      <Base backgroundColor="gray-1" className={css.dropzoneCardInner} padding="x3">
        <input {...getInputProps()} />
        <Flex direction="horizontal" className={css.scrollable}>
          {(!hasFiles || isMultiple) && (
            <div
              className={cx(css.dropzone, {
                [css.dropzoneActive]: isDragActive,
                [css.dropzoneHasFiles]: hasFiles
              })}
              {...getRootProps()}
            >
              {hasFiles ? (
                <Icon name="PlusAdd" color="grape-3" />
              ) : (
                <Flex direction="vertical" alignChildrenHorizontal="middle">
                  <Text size="x5" color="gray-7" align="middle" weight="medium">
                    {instructionsBeginning} <br />
                    or
                  </Text>
                  <Flex direction="horizontal" alignChildrenVertical="middle">
                    <Icon name="PlusAdd" color="grape-3" paddingHorizontal="x1" />
                    <Text size="x3" color="grape-3" align="middle" weight="medium">
                      {instructionsAction}
                    </Text>
                  </Flex>
                </Flex>
              )}
            </div>
          )}
          {thumbs}
        </Flex>
      </Base>
    </Card>
  );
};
