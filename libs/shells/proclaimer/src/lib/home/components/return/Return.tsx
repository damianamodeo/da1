import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRange,
  IonReorder,
  IonReorderGroup,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToggle,
  IonToolbar,
  ItemReorderEventDetail,
} from '@ionic/react';

export const Return = () => {
  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }
  return (
    <>
      <IonAccordionGroup>
        <IonAccordion value="first">
          <IonItem slot="header" color="light">
            <IonLabel>First Accordion</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ea
            iste hic ab unde maxime, iure nisi dolore incidunt sapiente ullam.
            In aspernatur eveniet vitae? Repellat perspiciatis explicabo maiores
            voluptatibus.
          </div>
        </IonAccordion>
        <IonAccordion value="second">
          <IonItem slot="header" color="light">
            <IonLabel>Second Accordion</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
            inventore. Odio, rem consequatur labore fugiat porro natus tempore
            totam reprehenderit velit. Eius, corrupti quam. Eaque neque expedita
            ex aliquid quibusdam?
          </div>
        </IonAccordion>
        <IonAccordion value="third">
          <IonItem slot="header" color="light">
            <IonLabel>Third Accordion</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde,
            voluptatibus perspiciatis eveniet incidunt sint, molestias
            necessitatibus quisquam adipisci commodi sit totam fugiat itaque
            dicta possimus dolore nostrum, inventore enim molestiae!
          </div>
        </IonAccordion>
      </IonAccordionGroup>
      <IonList>
        <IonItem>
          <IonTextarea
            placeholder="Type something here"
            autoGrow={true}
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus sem, auctor accumsan egestas sed, venenatis at ex. Nam consequat ex odio, suscipit rhoncus orci dictum eget. Aenean sit amet ligula varius felis facilisis lacinia nec volutpat nulla. Duis ullamcorper sit amet turpis sed blandit. Integer pretium massa eu faucibus interdum."
          ></IonTextarea>
        </IonItem>
        <IonItem>
          <IonRange
            aria-label="Dual Knobs Range"
            dualKnobs={true}
            value={{
              lower: 20,
              upper: 80,
            }}
          ></IonRange>
        </IonItem>
      </IonList>

      {/* The reorder gesture is disabled by default, enable it to drag and drop items */}
      <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
        <IonItem>
          <IonLabel>Item 1</IonLabel>
          <IonReorder slot="end"></IonReorder>
        </IonItem>

        <IonItem>
          <IonLabel>Item 2</IonLabel>
          <IonReorder slot="end"></IonReorder>
        </IonItem>

        <IonItem>
          <IonLabel>Item 3</IonLabel>
          <IonReorder slot="end"></IonReorder>
        </IonItem>

        <IonItem>
          <IonLabel>Item 4</IonLabel>
          <IonReorder slot="end"></IonReorder>
        </IonItem>

        <IonItem>
          <IonLabel>Item 5</IonLabel>
          <IonReorder slot="end"></IonReorder>
        </IonItem>
      </IonReorderGroup>

      <IonButton id="open-toast" expand="block">
        Open
      </IonButton>
      <p>
        This toast example uses triggers to automatically open a toast when the
        button is clicked.
      </p>
      <IonToast
        color={'warning'}
        trigger="open-toast"
        message="This toast will disappear after 5 seconds"
        duration={5000}
      ></IonToast>

      <IonList>
        <IonItem>
          <IonToggle color="success">Receive Push Notifications</IonToggle>
        </IonItem>
        <IonItem>
          <IonToggle color="success">Receive Emails</IonToggle>
        </IonItem>
        <IonItem>
          <IonToggle color="success">Receive Text Messages</IonToggle>
        </IonItem>
      </IonList>
    </>
  );
};

export default Return;
