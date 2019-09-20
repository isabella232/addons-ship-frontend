import { placeholderIcons } from '@/config';
import { ProjectType } from '@/models/app';

export const getIcon = (appIcon?: string, projectType?: ProjectType) => {
  let icon = appIcon;

  if (!icon) {
    icon = placeholderIcons[projectType!] || placeholderIcons.other;
  }

  const suffix = Math.random()
    .toString(16)
    .replace(/^0\./, '');

  return `${icon}?${suffix}`;
};
