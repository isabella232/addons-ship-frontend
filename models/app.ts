export type App = {
  appSlug: string;
  plan: string;
  title: string;
  avatarUrl: string;
  projectType: string;
  colors?: {
    start?: string;
    end?: string;
  };
};
