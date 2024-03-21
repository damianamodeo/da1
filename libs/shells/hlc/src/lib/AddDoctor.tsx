import { useState } from 'react';
import DoctorForm from './DoctorForm';
import { IonButton, IonItem, IonList } from '@ionic/react';
import { writeFirebaseDoc } from '@data-firebase';

const AddDoctor = () => {
  const [doctorDetails, setDoctorDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });
  const handleOnSubmit = () => {

    // writeFirebaseDoc({ path: "sf", data({ existingData, documentExists, }) {
        
    // },})



  };


  return (
    <div>
      <IonList inset>
        <DoctorForm
          doctorDetails={doctorDetails}
          setDoctorDetails={setDoctorDetails}
        ></DoctorForm>

        <IonButton expand="block" onClick={handleOnSubmit}>
          Submit
        </IonButton>
      </IonList>
    </div>
  );
};
export default AddDoctor;
