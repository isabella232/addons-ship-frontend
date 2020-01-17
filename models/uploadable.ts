export type Uploadable = {
  filename: string;
  filesize: number;
  deviceType?: string;
  screenSize?: string;
  uploadUrl?: string;
};

export type UploadableResponse = {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  downloadUrl: string;
  uploadUrl?: string;
  filename: string;
  filesize: number;
  uploaded: boolean;
};

export interface ScreenshotResponse extends UploadableResponse {
  deviceType: string;
  screenSize: string;
}
