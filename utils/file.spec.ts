jest.mock('node-fetch');

import fetch from 'node-fetch';

import { uploadFileToS3 } from './file';

describe('uploadFileToS3', () => {
  it('throws for invalid inputs', () => {
    expect(uploadFileToS3(undefined, undefined)).rejects.toEqual(new Error('File or presignedUrl is invalid'));
    expect(uploadFileToS3(new File([], ''), undefined)).rejects.toEqual(new Error('File or presignedUrl is invalid'));
    expect(uploadFileToS3(undefined, 'nope')).rejects.toEqual(new Error('File or presignedUrl is invalid'));
  });

  it('triggers a fetch', async () => {
    ((fetch as any) as jest.Mock).mockResolvedValueOnce({ ok: true });

    const file = new File([], 'something.txt');
    const presignedUrl = 'http://some.url?whatever';

    await uploadFileToS3(file, presignedUrl);

    expect(fetch).toHaveBeenCalledWith(presignedUrl, {
      method: 'put',
      body: file
    });
  });

  it('throws if something went wrong', () => {
    ((fetch as any) as jest.Mock).mockResolvedValueOnce({ ok: false, status: 400, statusText: 'Unathorized' });

    expect(uploadFileToS3(new File([], ''), 'whatever')).rejects.toEqual(new Error('400: Unathorized'));
  });
});
