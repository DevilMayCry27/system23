import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./pages/App";
import { store } from "./reducers/store.js";
import { MessageProvider } from "./context/MessageContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <MessageProvider>
      <SocketContextProvider>
        <Router>
          <App />
        </Router>
      </SocketContextProvider>
    </MessageProvider>
  </Provider>
  // </React.StrictMode>
);
