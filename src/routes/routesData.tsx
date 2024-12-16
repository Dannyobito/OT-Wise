import { EditUserPage } from "../components/user-management/edit-user-form";
import { LandingPage } from "../pages/landing-page/LandingPage";
import { NotFound } from "../pages/not-found/not-found";
import { AddUser } from "../pages/user-management/add-user";

type Route = {
  path: string;
  Component: React.FC;
};

export const allRoutes: Route[] = [
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/add-user",
    Component: AddUser,
  },
  {
    path: "/users/:userId",
    Component: EditUserPage,
  },
  {
    path: "*",
    Component: NotFound,
  },
];
