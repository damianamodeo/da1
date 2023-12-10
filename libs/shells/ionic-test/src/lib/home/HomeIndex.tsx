import { Page, TabbedPage } from '@ui-ion';
import { lazy } from 'react';
import HomePage from './Home';

const AddAddress = lazy(() => import('./record/add-address/AddAddress'));
const History = lazy(() => import('./record/history/History'));

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
    <Page label="Return" backButtonText="Home">
      <ReturnPage></ReturnPage>
    </Page>
  );
};

export const Write = () => {
  return (
    <Page label="Write" backButtonText="Home">
      <WritePage></WritePage>
    </Page>
  );
};
