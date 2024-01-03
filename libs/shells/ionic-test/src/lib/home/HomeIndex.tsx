import { Page, TabbedPage } from '@ui-ion';
import { lazy } from 'react';
import HomePage from './Home';

const AddAddress = lazy(() => import('./record/add-address/AddAddress'));
const History = lazy(() => import('./record/history/History'));

const Map = lazy(() => import('./return/map/Map'));
const List = lazy(() => import('./return/List'));

const ReturnPage = lazy(() => import('./Return'));

const WritePage = lazy(() => import('./Write'));

export const Home = () => {
  return (
    <Page label="Proclaimer" backButtonText="Home">
      <HomePage></HomePage>
    </Page>
  );
};

export const Record = () => {
  return (
    <TabbedPage
      label="Record"
      backButtonText="Home"
      content={[
        {
          label: 'Add Address',
          component: <AddAddress></AddAddress>,
        },
        {
          label: 'History',
          component: <History></History>,
        },
      ]}
    ></TabbedPage>
  );
};

export const Return = () => {
  return (
    <TabbedPage
      label="Return"
      backButtonText="Home"
      content={[
        {
          label: 'Map',
          component: <Map></Map>,
        },
        {
          label: 'List',
          component: <List></List>,
        },
      ]}
    ></TabbedPage>
  );
};

export const Write = () => {
  return (
    <Page label="Write" backButtonText="Home">
      <WritePage></WritePage>
    </Page>
  );
};
