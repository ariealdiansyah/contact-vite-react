import defaultImage from "../assets/default-image.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../assets/css/contact.module.css";

interface CardProps {
  imgSrc: string;
  firstName: string;
  lastName: string;
  age?: number;
  id: string;
}

export default function CardAntd({
  imgSrc,
  firstName,
  lastName,
  age,
  id,
}: CardProps) {
  const navigate = useNavigate();
  const [imgSource, setImgSrc] = useState(imgSrc);
  const handleError = () => {
    setImgSrc(defaultImage);
  };
  return (
    <div className={styles["contact-card"]} onClick={() => navigate(`/${id}`)}>
      <img
        className={styles["contact-image"]}
        onError={handleError}
        src={imgSource}
        alt={firstName}
      />
      <div className={styles["contact-info"]}>
        <div className={styles["contact-name"]}>
          {firstName} {lastName}
        </div>
        <div className={styles["contact-phone"]}>{age}</div>
      </div>
    </div>
  );
}
