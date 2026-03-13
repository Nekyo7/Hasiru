import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { LandingPage } from "./pages/LandingPage";
import { SignUpPage } from "./pages/SignUpPage";
import { CHCCentersPage } from "./pages/CHCCentersPage";
import { DiscoveryPage } from "./pages/DiscoveryPage";
import { EquipmentDetailPage } from "./pages/EquipmentDetailPage";
import { ListEquipmentPage } from "./pages/ListEquipmentPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MapViewPage } from "./pages/MapViewPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "signup", Component: SignUpPage },
      { path: "chc-centers", Component: CHCCentersPage },
      { path: "discover", Component: DiscoveryPage },
      { path: "equipment/:id", Component: EquipmentDetailPage },
      { path: "list-equipment", Component: ListEquipmentPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "map", Component: MapViewPage },
    ],
  },
]);
