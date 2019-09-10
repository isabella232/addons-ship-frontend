export type App = {
  appSlug: string;
  plan: string;
  title: string;
  avatarUrl: string;
  projectType: string;
  androidErrors: string[];
  iosErrors: string[];
  colors?: {
    start?: string;
    end?: string;
  };
};
