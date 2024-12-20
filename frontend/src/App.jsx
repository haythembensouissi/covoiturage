import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Layout from "./routes/layout/layout";
import HomePage from "./routes/homePage/homePage";
import ListPage from "./routes/listPage/listPage";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import Contact from "./routes/Contact/Contact";
import NewPostPage from "./routes/newPostPage/newPostPage";
import Reservation from "./routes/reservation/Reservation"
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import Reservations from "./components/ReservationCards/Reservations";

function App() {
  const [cookie] = useCookies();
  const token = cookie.token;

  // Conditional routes for authenticated and unauthenticated users
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list",
          element: <ListPage />
        },
        {
          path: "/addpost",
          element: <NewPostPage />
        },

        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: "/reservation/:id",
          element: <Reservation />
        },
        {
          path: "/singlepage/:id",
          element: <SinglePage />
        },
        {
          path: "/profileupdate",
          element: <ProfileUpdatePage />
        },
        {
          path: "/reservations",
          element: <Reservations />
        },
        // Protected Route - Only accessible when the user is logged in
        
          {
            path: "/profile",
            element: <ProfilePage />
          }
         ,
        // Public Routes - Accessible without being logged in
        ...(!token ? [
          {
            path: "/",
            element: <Login />
          },
          {
            path: "/register",
            element: <Register />
          }
        ] : []),
      ]
    }
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
