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
      return state.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<UserType>) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    clearAllUsers() {
      return initialState;
    },
  },
});
export const { addUser, deleteUser, clearAllUsers, updateUser } =
  usersSlice.actions;

export default usersSlice.reducer;
