import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Browse from "./components/Browse";
import AppLayout from "./components/AppLayout.jsx";
import Error from "./components/Error.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/browse", element: <Browse /> },
      { path: "/error", element: <Error /> }, // manual route
      { path: "*", element: <Error /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
