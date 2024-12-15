import { BrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/landing-page/LandingPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    </>
  );
};

export default App;
