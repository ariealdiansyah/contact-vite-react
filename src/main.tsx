import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage.tsx";
import ContactDetails from "./Contacts/details.tsx";
import EditContact from "./Contacts/edit.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.min.css";
import { PrimeReactProvider } from "primereact/api";
import AddContact from "./Contacts/add.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:contactId",
    element: <ContactDetails />,
  },
  {
    path: "/:contactId/edit",
    element: <EditContact />,
  },
  {
    path: "/addContact",
    element: <AddContact />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PrimeReactProvider>
  </React.StrictMode>
);
