import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, Base, Flex, Text, Icon } from '@bitrise/bitkit';
import cx from 'classnames';

import css from './style.scss';

type Props = {
  onFilesAdded: (files: File[]) => void;
  removeFile: (file: File) => void;
  files?: File[];
  isMultiple?: boolean;
  instructionsBeginning?: string;
  instructionsAction?: string;
};

export default ({
  onFilesAdded,
  removeFile,
  files = [],
  isMultiple = true,
  instructionsBeginning = 'Drag & Drop',
  instructionsAction = 'Browse Files'
}: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAdded(acceptedFiles);
    },
    [onFilesAdded, removeFile, files]
  );

  const thumbs = files.map(file => (
    <Base paddingHorizontal="x3" key={file.name} container className={css.thumbnailContainer}>
      <div className={css.removeIcon} onClick={() => removeFile(file)}>
        <Icon name="CloseSmall" color="white" />
      </div>
      <Base Component="img" src={URL.createObjectURL(file)} className={css.thumbnail} />
    </Base>
  ));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: isMultiple
  });

  const hasFiles = files.length > 0;

  return (
    <Card>
      <Base className={css.dropzoneCard} padding="x3">
        <input {...getInputProps()} />
        <Base backgroundColor="gray-1" padding="x3">
          <Flex direction="horizontal" height={384} className={css.scrollableWrapper}>
            <Flex direction="horizontal" height={400} className={css.scrollable}>
              <Flex direction="horizontal" height={384} className={css.scrollableInner}>
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
            </Flex>
          </Flex>
        </Base>
      </Base>
    </Card>
  );
};
