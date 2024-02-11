import { IonicApp } from '@ui-ion';
import { settingsOutline, homeOutline } from 'ionicons/icons';
import { Settings, Appearance } from './tabs/settings/Index';
import Home from './tabs/home/Home';
import Record from './tabs/home/pages/record/Record';
import Return from './tabs/home/pages/return/Return';
import Write from './tabs/home/pages/write/Write';
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

export const Proclaimer: React.FC = () => <IonicApp content={content}></IonicApp>;

export default Proclaimer;
