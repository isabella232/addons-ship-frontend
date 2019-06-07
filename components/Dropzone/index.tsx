import React, { useCallback, Fragment } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, Base, Flex, Text, Icon } from '@bitrise/bitkit';
import cx from 'classnames';

import css from './style.scss';

type Props = {
  onFilesAdded: (files: File[]) => void;
  removeFile: (file: File) => void;
  files?: File[];
};

export default ({ onFilesAdded, removeFile, files = [] }: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesAdded(acceptedFiles);
    },
    [onFilesAdded, removeFile, files]
  );

  const thumbs = files.map(file => (
    <Base paddingHorizontal="x3" key={file.name} container>
      <div className={css.removeIcon} onClick={() => removeFile(file)}>
        <Icon name="CloseSmall" color="white" />
      </div>
      <Base Component="img" src={URL.createObjectURL(file)} className={css.thumbnail} />
    </Base>
  ));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  const hasFiles = files.length > 0;

  return (
    <Card elevation="x1" padding="x3">
      <input {...getInputProps()} />
      <Base backgroundColor="gray-1" padding="x3">
        <Flex direction="horizontal" height={400} className={css.scrollable}>
          <div {...getRootProps()} style={{ display: 'flex', width: hasFiles ? '48px' : '100%' }}>
            <Flex
              direction="vertical"
              alignChildren="middle"
              borderRadius="x1"
              className={cx(css.dropzone, { [css.dropzoneActive]: isDragActive })}
              width={hasFiles ? 48 : '100%'}
            >
              {hasFiles ? (
                <Icon name="PlusAdd" color="grape-3" />
              ) : (
                <Fragment>
                  <Text size="x5" color="gray-7" align="middle" weight="medium">
                    Drag & Drop <br />
                    or
                  </Text>
                  <Flex direction="horizontal" alignChildrenVertical="middle">
                    <Icon name="PlusAdd" color="grape-3" paddingHorizontal="x1" />
                    <Text size="x3" color="grape-3" align="middle" weight="medium">
                      Browse Files
                    </Text>
                  </Flex>
                </Fragment>
              )}
            </Flex>
          </div>
          {thumbs}
        </Flex>
      </Base>
    </Card>
  );
};
