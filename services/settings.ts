import { Settings } from '@/models';

class SettingsService {
  constructor() {}

  isComplete = (settings: Settings) => {
    return !!settings;
  };
}

export default new SettingsService();
