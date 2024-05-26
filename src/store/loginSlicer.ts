import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LoginState {
  loggedIn: boolean;
  email: string;
}

const data = localStorage.getItem("email");

const initialState: LoginState = {
  loggedIn: false,
  email: "",
};

if (data) {
  initialState.loggedIn = true;
  initialState.email = data;
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.loggedIn = true;
      state.email = action.payload;

      localStorage.setItem("email", action.payload);
    },
    logout: (state) => {
      state.loggedIn = false;
      state.email = "";

      localStorage.removeItem("email");
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
export const selectLogin = (state: { login: LoginState }) => state.login;
