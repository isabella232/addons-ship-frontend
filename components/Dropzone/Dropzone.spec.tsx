import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Dropzone from './';
import { Screenshot } from '@/models';

describe('Dropzone', () => {
  (global as any).URL.createObjectURL = jest.fn();

  describe('renders correctly', () => {
    test('without files', () => {
      const tree = shallowToJson(shallow(<Dropzone removeFile={jest.fn()} onFilesAdded={jest.fn()} />));

      expect(tree).toMatchSnapshot();
    });

    test('with files', () => {
      const tree = shallowToJson(
        shallow(
          <Dropzone
            removeFile={jest.fn()}
            onFilesAdded={jest.fn()}
            screenshots={[new Screenshot('file.png', new File([], 'file.png'))]}
          />
        )
      );

      expect(tree).toMatchSnapshot();
    });
  });

  it('triggers onFilesAdded for images', async () => {
    const onFilesAdded = jest.fn();
    const files = [new File([], 'file.png')];

    const wrapper = shallow(<Dropzone removeFile={jest.fn()} onFilesAdded={onFilesAdded} />);

    await wrapper.find('input').simulate('change', {
      preventDefault: () => {},
      persist: () => {},
      target: { files }
    });

    expect(onFilesAdded).toHaveBeenCalledWith(files);
  });

  it('triggers removeFile', async () => {
    const removeFile = jest.fn();
    const screenshots = [
      new Screenshot('file1.png', new File([], 'file1.png')),
      new Screenshot('file2.jpg', new File([], 'file2.jpg'))
    ];

    const wrapper = shallow(<Dropzone removeFile={removeFile} onFilesAdded={jest.fn()} screenshots={screenshots} />);

    wrapper
      .find('.removeIcon')
      .last()
      .simulate('click');

    expect(removeFile).toHaveBeenCalledWith(screenshots[1]);
  });
});
