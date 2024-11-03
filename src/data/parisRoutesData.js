import WomenPage from "../pages/parisData/WomenPage";
import WomenWalksPage from "../pages/parisData/WomenWalksPage";
import Spots121314Page from "../pages/parisData/Spots121314Page";
import Spots121314WalksPage from "../pages/parisData/Spots121314WalksPage";
import PlaquesWW2Page from "../pages/parisData/PlaquesWW2Page";
import PlaquesPage from "../pages/parisData/PlaquesPage";
import ArcheologyPage from "../pages/parisData/ArcheologyPage";
import MoviesPage from "../pages/parisData/MoviesPage";
import CurrentLaneNamingPage from "../pages/parisData/CurrentLaneNamingPage";
import Flood1910Page from "../pages/parisData/Flood1910Page";

const routesData = [
  {
    path: "/archeology-places",
    component: ArcheologyPage,
    title: "Référentiel archéologique",
    url: "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/referentiel-archeologique-de-paris/records",
    src: "Open data Paris",
  },
  {
    path: "/movies-places",
    component: MoviesPage,
    title: "Lieux de tournage",
    url: "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris/records",
    src: "Open data Paris",
  },
  {
    path: "/plaques-ww2",
    component: PlaquesWW2Page,
    title: "Plaques commémoratives 1939-1945",
    url: "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/plaques_commemoratives_1939-1945/records",
    src: "Open data Paris",
  },
  {
    path: "/plaques",
    component: PlaquesPage,
    title: "Plaques commémoratives",
    url: "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/plaques_commemoratives/records",
    src: "Open data Paris",
  },
  {
    path: "/women-description",
    component: WomenPage,
    title: "Femmes illustres - Portraits",
    url: "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/femmes-illustres-a-paris-portraits/records",
    src: "Open data Paris",
  },
  {
    path: "/women-walks",
    component: WomenWalksPage,
    title: "Femmes illustres - Parcours + spots",
    url: [
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/femmes-illustres-a-paris-parcours/records",
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/femmes-illustres-a-paris-portraits/records",
    ],
    src: "Open data Paris",
  },
  {
    path: "/121314-poi",
    component: Spots121314Page,
    title: "12è 13è 14è - Spots",
    url: "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/paris-autrement-balades-dans-les-arrondissements-peripheriques-poi/records",
    src: "Open data Paris",
  },
  {
    path: "/121314-walks",
    component: Spots121314WalksPage,
    title: "12è 13è 14è - Parcours + spots",
    url: [
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/paris-autrement-balades-dans-les-arrondissements-peripheriques-parcours/records",
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/paris-autrement-balades-dans-les-arrondissements-peripheriques-poi/records",
    ],
    src: "Open data Paris",
  },
  {
    path: "/current-lanes",
    component: CurrentLaneNamingPage,
    title: "Dénomination des voies actuelles",
    url: "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/denominations-emprises-voies-actuelles/records",
    src: "Open data Paris",
  },
  {
    path: "/1910-flood",
    component: Flood1910Page,
    title: "Caves inondées en 1910",
    url: "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/zones-de-caves-inondees-1910/records",
    src: "Open data Paris",
  },
];

export default routesData;
