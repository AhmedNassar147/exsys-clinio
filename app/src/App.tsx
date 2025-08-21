/*
 *
 * Component: `App`.
 *
 */
import { memo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AppConfigProvider,
  useClientSettings,
} from "@exsys-clinio/app-config-store";
import AppGlobalStyles from "@exsys-clinio/app-global-styles";
import LabelsProvider from "@exsys-clinio/labels-provider";
import AppFooter from "@exsys-clinio/app-footer";
import AppHeader from "@exsys-clinio/app-header";
import DoctorsSearchPage from "@exsys-clinio/doctors-search-page";

const GlobalStyles = memo(() => {
  const { headerHeight, footerHeight, footerBackgroundImageUrl } =
    useClientSettings();

  return (
    <AppGlobalStyles
      footerHeight={footerHeight}
      headerHeight={headerHeight}
      footerBackgroundImageUrl={footerBackgroundImageUrl}
    />
  );
});

const App = () => {
  return (
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
        <AppFooter />
        <GlobalStyles />
      </AppConfigProvider>
    </BrowserRouter>
  );
};

export default App;
