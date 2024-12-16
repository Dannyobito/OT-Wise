import { BrowserRouter, Routes, Route } from "react-router-dom";
import { allRoutes } from "./routesData";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {allRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} Component={Component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
