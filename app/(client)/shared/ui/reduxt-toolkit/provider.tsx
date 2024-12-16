"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {/*<SessionProvider> </SessionProvider>*/}
      <NextUIProvider>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </NextUIProvider>
    </Provider>
  );
}
