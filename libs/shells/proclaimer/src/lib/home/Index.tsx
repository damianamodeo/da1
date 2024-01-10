import { Page, TabbedPage } from '@ui-ion';
import { lazy } from 'react';
import HomePage from './components/Home';
import RecordPage from './components/record/Record';
import ReturnPage from './components/return/Return';

const AddAddress = lazy(
  () => import('./components/record/add-address/AddAddress')
);
const History = lazy(() => import('./components/record/history/History'));

const Map = lazy(() => import('./components/return/map/Map'));
const List = lazy(() => import('./components/return/list/List'));

const WritePage = lazy(() => import('./components/write/Write'));

export const Home = () => {
  return (
    <Page label="Proclaimer" backButtonText="Home">
      <HomePage></HomePage>
    </Page>
  );
};

export const Record = () => {
  return <RecordPage></RecordPage>;
};

export const Return = () => {
  return <ReturnPage></ReturnPage>;
};

export const Write = () => {
  return (
    <Page label="Write" backButtonText="Home">
      <WritePage></WritePage>
    </Page>
  );
};
