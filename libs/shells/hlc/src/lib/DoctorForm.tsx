import { IonInput, IonItem } from '@ionic/react';

const AddDoctorForm = ({ doctorDetails, setDoctorDetails }: any) => {
  const onChange = (e: any) => {
    setDoctorDetails({
      ...doctorDetails,
      [e.target.name]: e.target.value,
    });
    
  };
  return (
    <>
      <IonItem>
        <IonInput
          label="First Name"
          autocapitalize="words"
          clear-input
          name="firstName"
          value={doctorDetails.firstName}
          onIonInput={onChange}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          label="Last Name"
          autocapitalize="words"
          clear-input
          name="lastName"
          value={doctorDetails.lastName}
          onIonInput={onChange}
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          label="Phone"
          clear-input
          name="phone"
          value={doctorDetails.phone}
          onIonInput={onChange}
          type="tel"
        ></IonInput>
      </IonItem>
    </>
  );
};
export default AddDoctorForm;
