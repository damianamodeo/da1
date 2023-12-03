import { Page } from '@ui-ion';
import SettingsContent from './Settings';
import AppearanceContent from './Appearance';

export const Settings = () => {
  return (
    <Page label={'Settings'}>
      <SettingsContent></SettingsContent>
    </Page>
  );
};

export const Appearance = () => {
  return (
    <Page label={'Appearance'}>
      <AppearanceContent></AppearanceContent>
    </Page>
  );
};
