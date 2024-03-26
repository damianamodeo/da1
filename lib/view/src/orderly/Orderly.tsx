import { IonicApp } from '@ui-ion';
import { settingsOutline, homeOutline } from 'ionicons/icons';
import '@global/styles';
import { HomePage } from './HomePage';
import { Settings } from './SettingsPage';
import { useEffect } from 'react';
import { useOrderlyDB } from '@data-zustand';
import PublisherDetailsPage from './publisher/PublisherDetailsPage';
import PublisherListPage from './publisher/PublisherListPage';

const content = [
  // HOME
  {
    label: 'Home',
    component: HomePage,
    isTab: true,
    icon: homeOutline,
    path: '/home',
    redirect: true,
  },
  {
    label: 'PublisherListPage',
    component: PublisherListPage,
    path: '/home/publisher',
    redirect: true,
  },
  {
    label: 'PublisherDetailsPage',
    component: PublisherDetailsPage,
    path: '/home/publisher/details/:id',
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

export const Orderly: React.FC = () => {
  const initDb = useOrderlyDB.use.init();

  useEffect(() => {
    initDb();
  }, [initDb]);

  return <IonicApp content={content}></IonicApp>;
};

export default Orderly;
