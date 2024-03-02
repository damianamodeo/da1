import { IonicApp } from '@ui-ion';
import { settingsOutline, homeOutline } from 'ionicons/icons';
import '@global/styles';
import { Home } from './Home';
import { Settings } from './Settings';

const content = [
  // HOME
  {
    label: 'Home',
    component: Home,
    isTab: true,
    icon: homeOutline,
    path: '/home',
    redirect: true,
  },
  // SETTINGS
  {
    label: 'Settings',
    component: Settings,
    isTab: true,
    icon: settingsOutline,
    path: '/settings',
  },
];

export const path = content.reduce((acc, current) => {
  acc[current.label] = current.path;
  return acc;
}, {} as { [key: string]: string });

export const Orderly: React.FC = () => <IonicApp content={content}></IonicApp>;

export default Orderly;
