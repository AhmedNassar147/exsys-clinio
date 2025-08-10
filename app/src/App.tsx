/*
 *
 * Component: `App`.
 *
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppConfigProvider } from "@exsys-clinio/app-config-store";
import { ThemeProvider } from "styled-components";
import AppGlobalStyles from "@exsys-clinio/app-global-styles";
import { CLIENTS_CONFIG } from "@exsys-clinio/global-app-constants";
import LabelsProvider from "@exsys-clinio/labels-provider";
import AppFooter from "@exsys-clinio/app-footer";
import AppHeader from "@exsys-clinio/app-header";
import DoctorsSearchPage from "@exsys-clinio/doctors-search-page";

const App = () => {
  const clientConfig = CLIENTS_CONFIG[process.env.REACT_APP_CLIENT_KEY || "S"];

  return (
    <ThemeProvider theme={clientConfig}>
      <BrowserRouter basename="/">
        <AppConfigProvider>
          <LabelsProvider componentName="webDoctorBooking">
            <AppHeader />
            <main>
              <div className="main-clinio-app-wrapper">
                <Routes>
                  <Route path="*" element={<DoctorsSearchPage />} />
                </Routes>
              </div>
            </main>
          </LabelsProvider>
        </AppConfigProvider>
      </BrowserRouter>
      <AppGlobalStyles />
      <AppFooter />
    </ThemeProvider>
  );
};

export default App;
