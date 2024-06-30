import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { editContact, getContact } from "../store/Contact/contactSlice";
import styles from "../assets/css/contact.module.css";

const EditContacts = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { details } = useSelector((state: RootState) => state.contact);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getContact(contactId as string));
  }, [contactId, dispatch]);

  const [firstName, setFirstName] = React.useState(details?.firstName || "");
  const [lastName, setLastName] = React.useState(details?.lastName || "");
  const [age, setAge] = React.useState(details?.age || 0);
  const [image, setImage] = React.useState(details?.photo || "");

  const handleSave = () => {
    dispatch(
      editContact({
        id: details.id,
        firstName: details.firstName,
        lastName,
        age,
        photo: image,
      })
    );
    navigate(`/${details!.id}`);
  };

  return (
    <div className={styles["contact-container"]}>
      <h2>Edit Contact</h2>
      <div className={styles["contact-edit-card"]}>
        <div className={styles["contact-edit-header"]}>
          <Button
            icon="pi pi-arrow-left"
            className="p-button-text"
            onClick={() => navigate(`/${details.id}`)}
          />
        </div>
        <div className={styles["contact-edit-body"]}>
          <div className={styles["contact-edit-field"]}>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles["contact-edit-field"]}>
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={styles["contact-edit-field"]}>
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
          </div>
          <div className={styles["contact-edit-field"]}>
            <label>Image URL:</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <Button
            label="Save"
            icon="pi pi-check"
            className="p-button-raised p-button-rounded"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default EditContacts;
