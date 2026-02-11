import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import type { ReactNode } from "react";

const App = (): ReactNode => {
    return <RouterProvider router={router} />;
};

export default App;
