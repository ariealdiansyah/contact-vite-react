import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useState } from "react";
import { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { AddContactInterface, addContact } from "../store/Contact/contactSlice";
import styles from "../assets/css/contact.module.css";

const AddContact = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [photo, setPhoto] = useState("");

  const handleSave = () => {
    const newContact: AddContactInterface = {
      firstName,
      lastName,
      age,
      photo,
    };
    dispatch(addContact(newContact));
    navigate("/");
  };

  return (
    <div className={styles["contact-container"]}>
      <h2>Add Contact</h2>
      <div className={styles["contact-edit-card"]}>
        <div className={styles["contact-edit-header"]}>
          <Button
            icon="pi pi-arrow-left"
            className="p-button-rounded p-button-outlined"
            onClick={() => navigate("/")}
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
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
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

export default AddContact;
