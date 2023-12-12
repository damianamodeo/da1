import React, { useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonSearchbar,
  IonToolbar,
  IonNote,
  IonLabel,
} from '@ionic/react';
import type { CheckboxCustomEvent } from '@ionic/react';

type Item = {
  text: string;
  value: string;
};
interface TypeaheadProps {
  items: Item[];
  selectedItems: string[];
  title?: string;
  onInputChange: () => void;
  onSelectionCancel?: () => void;
  onSelectionChange?: (items: string[]) => void;
}

// TODO: Convert Autocomplee to Async component so that its otpions can be dynamic

export const Autocomplete = ({
  onSelect,
  onInputChange,
  onCancel,
  ...props
}: any) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{props.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onCancel}>Cancel</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            onIonInput={(e) => onInputChange(e.detail.value)}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
        <IonList id="modal-list" inset={true}>
          {props.items.map((item: any) => (
            <IonItem
              key={item.value.place_name}
              onClick={() => onSelect(item)}
              // value={item.value}
            >
              <IonLabel>
                {item.text}
                <IonNote style={{ display: 'block' }}>
                  {item.value.place_name.substring(
                    item.value.place_name.indexOf(', ') + 1
                  )}
                </IonNote>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
};
export default Autocomplete;
