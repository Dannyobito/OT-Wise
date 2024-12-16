import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/user";

const initialState: UserType[] = [];
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<UserType>) {
      state.push(action.payload);
    },
    deleteUser(state, action: PayloadAction<number>) {
      state = state.filter((user) => user.id !== action.payload);
    },
    clearAllUsers() {
      return initialState;
    },
  },
});
export const { addUser, deleteUser, clearAllUsers } = usersSlice.actions;

export default usersSlice.reducer;
