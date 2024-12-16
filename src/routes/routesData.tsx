import { LandingPage } from "../pages/landing-page/LandingPage";
import { NotFound } from "../pages/not-found/not-found";

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
    path: "*",
    Component: NotFound,
  },
];
