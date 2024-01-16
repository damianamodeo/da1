import { IonicApp } from '@ui-ion';
import { settingsOutline, homeOutline } from 'ionicons/icons';
import { Settings, Appearance } from './settings/Index';
import Home from './home/pages/Home';
import Record from './home/pages/record/Record';
import Return from './home/pages/return/Return';
import Write from './home/pages/write/Write';
import "@global/styles"


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
  {
    label: 'Record',
    component: Record,
    path: '/home/record',
  },
  {
    label: 'Return',
    component: Return,
    path: '/home/return',
  },
  {
    label: 'Write',
    component: Write,
    path: '/home/write',
  },
  // SETTINGS
  {
    label: 'Settings',
    component: Settings,
    isTab: true,
    icon: settingsOutline,
    path: '/settings',
  },
  {
    label: 'Appearance',
    component: Appearance,
    path: '/settings/apperance',
  },
];

export const path = content.reduce((acc, current) => {
  acc[current.label] = current.path;
  return acc;
}, {} as { [key: string]: string });

export const AppShell: React.FC = () => <IonicApp content={content}></IonicApp>;

export default AppShell;
