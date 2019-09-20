export type App = {
  appSlug: string;
  plan: string;
  title: string;
  avatarUrl: string;
  projectType: ProjectType;
  androidErrors: string[];
  iosErrors: string[];
  colors?: {
    start?: string;
    end?: string;
  };
};

export type ProjectType =
  | 'xamarin'
  | 'ios'
  | 'osx'
  | 'macos'
  | 'android'
  | 'cordova'
  | 'ionic'
  | 'react-native'
  | 'flutter'
  | 'other';
