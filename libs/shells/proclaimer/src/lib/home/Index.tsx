import { Page } from '@ui-ion';
import HomePage from './components/Home';
import RecordPage from './components/record/Record';
import ReturnPage from './components/return/Return';
import WritePage from './components/write/Write';

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
  return <WritePage></WritePage>;
};
