import RiverHeritageComp from "../components/idfData/RiverHeritageComp";
import RegionalInterestHeritageComp from "../components/idfData/RegionalInterestHeritageComp";
import HousesOfFamousComp from "../components/idfData/HousesOfFamousComp";
import HistoricMonumentsBuildings from "../components/idfData/HistoricMonumentsBuildings";
import SportsSitesComp from "../components/idfData/SportsSitesComp";
import UnescoWorldHeritageComp from "../components/idfData/UnescoWorldHeritageComp";
import VillesPaysArtHistoireComp from "../components/idfData/VillesPaysArtHistoireComp";
import IndustrialHeritageMHComp from "../components/idfData/IndustrialHeritageMHComp";
import RemarkableContemporaryArchitecture from "../components/idfData/remarkableContemporaryArchitecture";
import GourmetHeritageComp from "../components/idfData/GourmetHeritageComp";

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
  {
    path: "/sports-sites",
    url: [
      "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/sites-sportifs-emblematiques",
    ],
    title: "Patrimoine - 100 sites sportifs emblématiques",
    src: "Open data Ile-de-France (origine: Ministère de la Culture)",
    component: SportsSitesComp,
  },
  {
    path: "/unesco-world-heritage",
    url: [
      "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/sites-labellises-patrimoine-mondial-de-lunesco-en-ile-de-france-donnee-minister0",
    ],
    title: "Sites labellisés patrimoine mondial de l’UNESCO en Île-de-France",
    src: "Open data Ile-de-France (origine: Ministère de la culture et de la communication)",
    component: UnescoWorldHeritageComp,
  },
  {
    path: "/villes-pays-art-histoire",
    url: [
      "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/ville-et-pays-dart-et-dhistoire-en-ile-de-france-donnee-ministere-de-la-culture0",
      //   "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/vpah_idf",
    ],
    title: "Ville et pays d'art et d'histoire en Île-de-France - 2 jeux",
    src: "Open data Ile-de-France (origine: Ministère de la culture et de la communication)",
    component: VillesPaysArtHistoireComp,
  },
  {
    path: "/patrimoine-industriel-mh",
    url: [
      "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/monuments-historiques-classes-ou-inscrits-de-type-industriel-en-ile-de-france-do",
    ],
    title:
      "Monuments historiques classés ou inscrits de type industriel en Île-de-France (2012)",
    src: "Open data Ile-de-France (origine: Drac)",
    component: IndustrialHeritageMHComp,
  },
  {
    path: "/remarkable-contemporary-architecture",
    url: [
      "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/architecture-contemporaine-remarquable-en-ile-de-france-biens-labellises-et-prot/",
    ],
    title:
      "Architecture contemporaine remarquable en Île-de-France (biens labellisés et protégés)",
    src: "L'Institut Paris Region",
    component: RemarkableContemporaryArchitecture,
  },
  {
    path: "/gourmet-heritage",
    url: [
      "https://data.iledefrance.fr/api/explore/v2.1/catalog/datasets/base-de-donnees-patrimoine-gourmand-idf",
    ],
    title: "Base de données « Patrimoine gourmand » d'Île-de-France",
    src: "Open data Ile-de-France",
    component: GourmetHeritageComp,
  },
];

export default idfRoutesData;
