import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

// Define a type for the slice state
export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
}

export interface AddContactInterface {
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
}

export interface ContactState {
  data: Contact[];
  details: Contact;
  isLoading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: ContactState = {
  data: [],
  details: {
    id: "",
    firstName: "Yuki",
    lastName: "Clarisha",
    age: 0,
    photo: "yuhu",
  },
  isLoading: false,
  error: null,
};

export const getContact = createAsyncThunk<
  Contact,
  string,
  { rejectValue: string }
>("contact/getContact", async (id, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://contact.herokuapp.com/contact/${id}`
    );
    const { data } = response.data;
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const addContact = createAsyncThunk<
  AddContactInterface,
  AddContactInterface,
  { rejectValue: string }
>("contact/addContact", async (contact, thunkAPI) => {
  try {
    const response = await axios.post(
      `https://contact.herokuapp.com/contact/`,
      contact
    );
    const { data } = response.data;
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const editContact = createAsyncThunk<
  Contact,
  Contact,
  { rejectValue: string }
>("contact/editContact", async (contact, thunkAPI) => {
  try {
    const response = await axios.put(
      `https://contact.herokuapp.com/contact/${contact.id}`,
      {
        firstName: contact.firstName,
        lastName: contact.lastName,
        age: contact.age,
        photo: contact.photo,
      }
    );
    const { data } = response.data;
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const deleteContact = createAsyncThunk<
  Contact,
  string,
  { rejectValue: string }
>("contact/deleteContact", async (id, thunkAPI) => {
  try {
    const response = await axios.delete(
      `https://contact.herokuapp.com/contact/${id}`
    );
    const { data } = response.data;
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const getListContact = createAsyncThunk<
  Contact[],
  void,
  { rejectValue: string }
>("contact/getListContact", async (_, thunkAPI) => {
  try {
    const response = await axios.get("https://contact.herokuapp.com/contact");
    const { data } = response.data;
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          console.log("payload", action.payload);
          state.details = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(getContact.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getListContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getListContact.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload || "Something went wrong";
        }
      )
      .addCase(
        getListContact.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          console.log("payload", action.payload);
          state.data = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addContact.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        editContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.details = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(editContact.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteContact.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectContactById = (contactId?: string) => (state: RootState) => {
  if (!contactId) {
    return undefined;
  }
  console.log(contactId, state.contact.data);
  const res = state.contact.data.find((c) => c.id === contactId);
  console.log("res", res);
  return res;
};

export const selectContactDetail = (state: RootState) => {
  return state.contact.details;
};

export default contactSlice.reducer;
