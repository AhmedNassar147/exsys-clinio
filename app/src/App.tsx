/*
 *
 * Component: `App`.
 *
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppConfigProvider } from "@exsys-clinio/app-config-store";
import LabelsProvider from "@exsys-clinio/labels-provider";
import Flex from "@exsys-clinio/flex";
import AppFooter from "@exsys-clinio/app-footer";
import AppHeader from "@exsys-clinio/app-header";
import DoctorsSearchPage from "@exsys-clinio/doctors-search-page";
import sagafLogo from "../assets/sagafLogo.jpeg";

const App = () => (
  <>
    <BrowserRouter basename="/">
      <AppConfigProvider>
        <LabelsProvider componentName="webDoctorBooking">
          <AppHeader />
          <main>
            <Flex className="main-clinio-app-wrapper">
              <img className="client-logo" src={sagafLogo} alt="client-logo" />
              <div>
                <Routes>
                  <Route path="*" element={<DoctorsSearchPage />} />
                </Routes>
              </div>
            </Flex>
          </main>
        </LabelsProvider>
      </AppConfigProvider>
    </BrowserRouter>
    <AppFooter />
  </>
);

export default App;
