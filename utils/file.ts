import fetch from 'node-fetch';

export const uploadFileToS3 = async (file: File | undefined, presignedUrl: string | undefined) => {
  if (!file || !presignedUrl) throw new Error('File or presignedUrl is invalid');

  const options = {
    method: 'put',
    body: file as any
  };

  return fetch(presignedUrl, options).then(resp => {
    if (!resp.ok) throw new Error(`${resp.status}: ${resp.statusText}`);
  });
};
