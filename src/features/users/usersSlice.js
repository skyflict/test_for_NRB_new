import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://reactapi.bsite.net/api/Employee");
  const users = await response.json();
  return users;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    userAdded(state, action) {
      state.entities.push(action.payload);
    },
    userUpdated(state, action) {
      const { employeeId, firstName, lastName, birthday, height } =
        action.payload;
      const existingUser = state.entities.find(
        (user) => user.employeeId === employeeId
      );
      if (existingUser) {
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.birthday = birthday;
        existingUser.height = height;
      }
    },
    userDeleted(state, action) {
      const { employeeId } = action.payload;
      const existingUser = state.entities.find(
        (user) => user.employeeId === employeeId
      );
      if (existingUser) {
        state.entities = state.entities.filter(
          (user) => user.employeeId !== employeeId
        );
      }
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { userAdded, userUpdated, userDeleted } = usersSlice.actions;

export default usersSlice.reducer;
