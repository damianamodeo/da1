import { NotAtHomeAddress } from '@data-firebase';

export const addressLabel = (address: NotAtHomeAddress) => {
  return `${address.unitNumber && `${address.unitNumber}/`}
      ${address.houseNumber} ${address.street}, ${address.suburb}`;
};
