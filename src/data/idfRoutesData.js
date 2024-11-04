import RiverHeritageComp from "../components/idfData/RiverHeritageComp";
import RegionalInterestHeritageComp from "../components/idfData/RegionalInterestHeritageComp";
import HousesOfFamousComp from "../components/idfData/HousesOfFamousComp";
import HistoricMonumentsBuildings from "../components/idfData/HistoricMonumentsBuildings";

const idfRoutesData = [
  {
    path: "/river-heritage",
    url: [
      "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/patrimoine-fluvial-remarquable-des-bords-de-seine-et-de-marne",
    ],
    title: "Patrimoine fluvial remarquable des bords de seine et de Marne",
    src: "Open data Ile-de-France",
    component: RiverHeritageComp,
  },
  {
    path: "/regional-interest-heritage",
    url: [
      "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/sites-labellises-patrimoine-dinteret-regional",
    ],
    title: "Sites labellisés Patrimoine d'intérêt régional",
    src: "Open data Ile-de-France",
    component: RegionalInterestHeritageComp,
  },
  {
    path: "/houses-of-famous",
    url: [
      "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/maisons-des-illustres",
    ],
    title: "Maisons des illustres en Île-de-France",
    src: "Open data Ile-de-France (origine: Ministère de la Culture)",
    component: HousesOfFamousComp,
  },
  {
    path: "/historic-monuments-buildings",
    url: [
      "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/immeubles-proteges-au-titre-des-monuments-historiques",
    ],
    title:
      "Immeubles protégés au titre des Monuments Historiques (Île-de-France)",
    src: "Open data Ile-de-France (origine: Ministère de la Culture)",
    component: HistoricMonumentsBuildings,
  },
];

export default idfRoutesData;
