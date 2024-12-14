import { BrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";

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
