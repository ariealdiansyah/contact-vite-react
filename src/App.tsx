import "./App.css";
import { getListContact } from "./store/Contact/contactSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import Card from "./components/Card";
import { Button } from "primereact/button";

function App() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.contact
  );

  useEffect(() => {
    dispatch(getListContact());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="container">
        <ProgressSpinner
          style={{ width: "60px", height: "60px" }}
          strokeWidth="5"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No user data</div>;
  }

  return (
    <div className="container">
      <div className="add-button-wrapper">
        <Button
          className="p-button-raised p-button-rounded"
          icon="pi pi-plus"
          onClick={() => navigate("/addContact")}
          tooltip="Add New Contact"
        />
      </div>
      <h2>Contact List</h2>
      <div className="contacts-wrapper">
        {data.map((contact) => (
          <Card
            key={contact.id}
            firstName={contact.firstName}
            lastName={contact.lastName}
            imgSrc={contact.photo}
            age={contact.age}
            id={contact.id}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
