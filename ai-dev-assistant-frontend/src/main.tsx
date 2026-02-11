import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { AuthProvider } from "./features/auth/AuthContext";
import { RepoProvider } from "./features/repo/RepoContext";
import "./styles/index.css";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    <AuthProvider>
      <RepoProvider>
        <App />
      </RepoProvider>
    </AuthProvider>

  </React.StrictMode>
);
