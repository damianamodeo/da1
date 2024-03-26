import { IonicApp } from '@ui-ion';
import { settingsOutline, homeOutline } from 'ionicons/icons';
import '@global/styles';
import { HomeView } from './HomeView';
import { Settings } from './Settings';
import { useEffect } from 'react';
import { useOrderlyDB } from '@data-zustand';
import PublisherDetailsView from './PublisherDetailsView';
import EditPublisherView from './EditPublisherView';
import PublisherListView from './PublisherListView';

const content = [
  // HOME
  {
    label: 'Home',
    component: HomeView,
    isTab: true,
    icon: homeOutline,
    path: '/home',
    redirect: true,
  },
  {
    label: 'PublisherDetailsView',
    component: PublisherDetailsView,
    path: '/home/publisher/details/:id',
    redirect: true,
  },
  {
    label: 'EditPublisherView',
    component: EditPublisherView,
    path: '/home/publisher/edit/:id',
    redirect: true,
  },
  {
    label: 'PublisherListView',
    component: PublisherListView,
    path: '/home/publisher',
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
