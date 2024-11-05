import ArcheologyComp from "../components/parisData/ArcheologyComp";
import MoviesComp from "../components/parisData/MoviesComp";
import PlaquesWW2Comp from "../components/parisData/PlaquesWW2Comp";
import PlaquesComp from "../components/parisData/PlaquesComp";
import WomenComp from "../components/parisData/WomenComp";
import CurrentLaneNamingComp from "../components/parisData/CurrentLaneNamingComp";
import Flood1910Comp from "../components/parisData/Flood1910Comp";
import Spots121314Comp from "../components/parisData/Spots121314Comp";

const routesData = [
  {
    path: "/archeology-places",
    component: ArcheologyComp,
    title: "Référentiel archéologique",
    url: [
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/referentiel-archeologique-de-paris",
    ],
    src: "Open data Paris",
  },
  {
    path: "/movies-places",
    component: MoviesComp,
    title: "Lieux de tournage",
    url: [
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/lieux-de-tournage-a-paris",
    ],
    src: "Open data Paris",
  },
  {
    path: "/plaques-ww2",
    component: PlaquesWW2Comp,
    title: "Plaques commémoratives 1939-1945",
    url: [
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/plaques_commemoratives_1939-1945",
    ],
    src: "Open data Paris",
  },
  {
    path: "/plaques",
    component: PlaquesComp,
    title: "Plaques commémoratives",
    url: [
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/plaques_commemoratives",
    ],
    src: "Open data Paris",
  },
  {
    path: "/women-description",
    component: WomenComp,
    title: "Femmes illustres",
    url: [
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/femmes-illustres-a-paris-portraits",
    ],
    src: "Open data Paris",
  },
  {
    path: "/121314-poi",
    component: Spots121314Comp,
    title: "12è 13è 14è",
    url: [
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/paris-autrement-balades-dans-les-arrondissements-peripheriques-poi",
    ],
    src: "Open data Paris",
  },
  {
    path: "/current-lanes",
    component: CurrentLaneNamingComp,
    title: "Dénomination des voies actuelles",
    url: [
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/denominations-emprises-voies-actuelles",
    ],
    src: "Open data Paris",
  },
  {
    path: "/1910-flood",
    component: Flood1910Comp,
    title: "Caves inondées en 1910",
    url: [
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/zones-de-caves-inondees-1910",
    ],
    src: "Open data Paris",
  },
];

export default routesData;
