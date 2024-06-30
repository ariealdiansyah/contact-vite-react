import { useParams } from "react-router-dom";
import styles from "../assets/css/contact.module.css";
import { useEffect, useState } from "react";
import { deleteContact, getContact } from "../store/Contact/contactSlice";
import defaultImage from "../assets/default-image.jpg";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const ContactDetails = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { details } = useSelector((state: RootState) => state.contact);
  const [imgSource, setImgSrc] = useState<string | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getContact(contactId as string));
    setImgSrc(details?.photo);
  }, [dispatch, contactId]);

  const handleError = () => {
    setImgSrc(defaultImage);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const handleEditClick = () => {
    navigate(`/${contactId}/edit`);
  };

  const handleDeleteClick = () => {
    dispatch(deleteContact(details.id));
    navigate("/");
  };

  return (
    <>
      {details ? (
        <div className={styles["contact-container"]}>
          <h2>Contact Detail</h2>
          <div className={styles["contact-detail-card"]}>
            <div className={styles["contact-detail-header"]}>
              <Button
                icon="pi pi-arrow-left"
                className="p-button-text"
                onClick={handleBackClick}
              />
              <Button
                icon="pi pi-pencil"
                className="p-button-text"
                onClick={handleEditClick}
              />
            </div>
            <div className={styles["contact-detail-body"]}>
              <img
                className={styles["contact-detail-image"]}
                src={imgSource}
                alt={details.firstName}
                onError={handleError}
              />
              <div className={styles["contact-detail-info"]}>
                <h2>
                  {details.firstName} {details.lastName}
                </h2>
                <p>
                  <strong>Age:</strong> {details.age}
                </p>
              </div>
            </div>
            <Button
              label="Delete"
              icon="pi pi-trash"
              className="p-button-raised p-button-danger p-button-rounded"
              onClick={handleDeleteClick}
            />
          </div>
        </div>
      ) : (
        <div>Contact not found</div>
      )}
    </>
  );
};

export default ContactDetails;
