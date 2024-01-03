import { Page, TabbedPage } from '@ui-ion';
import { lazy } from 'react';
import HomePage from './components/Home';

const AddAddress = lazy(() => import('./components/record/add-address/AddAddress'));
const History = lazy(() => import('./components/record/history/History'));

const Map = lazy(() => import('./components/return/map/Map'));
const List = lazy(() => import('./components/return/list/List'));

const ReturnPage = lazy(() => import('./components/return/Return'));

const WritePage = lazy(() => import('./components/write/Write'));

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
