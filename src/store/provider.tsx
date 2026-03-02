"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store"; // adjust path if needed

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};