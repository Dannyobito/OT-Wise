import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/user";

const initialState: UserType = {
  id: 0,
  profilePhoto: "",
  firstName: "",
  lastName: "",
  dob: "",
  occupation: "",
  gender: "male",
  email: "",
  phoneNumber: "",
  fax: "",
  linkedInUrl: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: 0,
  academicBackground: [],
};
const addUserSlice = createSlice({
  name: "addUser",
  initialState,
  reducers: {
    updateUserState(state, action: PayloadAction<Partial<UserType>>) {
      return { ...state, ...action.payload };
    },
  },
});
export const { updateUserState } = addUserSlice.actions;

export default addUserSlice.reducer;
