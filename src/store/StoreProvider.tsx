"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./index";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  // Lazy initial state creates the store exactly once per component instance
  // (i.e. once per request on the server, once for the app on the client).
  const [store] = useState(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
