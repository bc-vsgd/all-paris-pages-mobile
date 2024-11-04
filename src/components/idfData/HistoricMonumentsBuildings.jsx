import React from "react";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

function HistoricMonumentsBuildings({ result }) {
  if (
    !result.coordonnees_au_format_wgs84 ||
    !result.coordonnees_au_format_wgs84.lon ||
    !result.coordonnees_au_format_wgs84.lat
  ) {
    return null;
  }

  const { lon, lat } = result.coordonnees_au_format_wgs84;
  const details = [
    { key: "commune_forme_editoriale", label: <strong>Commune:</strong> },
    {
      key: "destination_actuelle_de_l_edifice",
      label: "Destination actuelle:",
    },
    { key: "autre_appellation_de_l_edifice", label: "Autre appellation:" },
    { key: "auteur_de_l_edifice", label: "Auteur:" },
    { key: "historique", label: "Historique:" },
    { key: "type_de_couverture", label: "Type de couverture:" },
    { key: "datation_de_l_edifice", label: "Datation:" },
    { key: "denomination_de_l_edifice", label: "Dénomination:" },
    {
      key: "lieu_de_conservation_d_un_element_architectural_deplace",
      label: "Lieu de conservation:",
    },
    { key: "description_de_l_edifice", label: "Description:" },
    {
      key: "dimensions_normalisees_des_edicules_uniquement",
      label: "Dimensions:",
    },
    {
      key: "date_de_creation_de_la_notice",
      label: "Date de création de la notice:",
    },
    { key: "domaine", label: "Domaine:" },
    {
      key: "date_et_typologie_de_la_protection",
      label: "Date et typologie de la protection:",
    },
    {
      key: "partie_d_elevation_exterieure",
      label: "Partie d'élévation extérieure:",
    },
    {
      key: "source_de_l_energie_utilisee_par_l_edifice",
      label: "Source de l'énergie:",
    },
    {
      key: "emplacement_forme_et_structure_de_l_escalier",
      label: "Emplacement de l'escalier:",
    },
    {
      key: "description_de_l_elevation_interieure",
      label: "Élévation intérieure:",
    },
    { key: "etat_de_conservation", label: "État de conservation:" },
    { key: "cadre_de_l_etude", label: "Cadre de l'étude:" },
    { key: "genre_du_destinataire", label: "Genre du destinataire:" },
    {
      key: "nom_du_cours_d_eau_traversant_ou_bordant_l_edifice",
      label: "Nom du cours d'eau:",
    },
    {
      key: "justification_attribution",
      label: "Justification de l'attribution:",
    },
    {
      key: "justification_de_la_datation",
      label: "Justification de la datation:",
    },
    { key: "lieudit", label: "Lieudit:" },
    { key: "materiaux_du_gros_oeuvre", label: "Matériaux du gros œuvre:" },
    { key: "observations", label: "Observations:" },
    { key: "precision_affectataire", label: "Précision affectataire:" },
    {
      key: "partie_constituante_non_etudiee",
      label: "Partie constituante non étudiée:",
    },
    { key: "partie_constituante", label: "Partie constituante:" },
    {
      key: "precision_sur_la_denomination",
      label: "Précision sur la dénomination:",
    },
    {
      key: "personnes_liees_a_l_edifice",
      label: "Personnes liées à l'édifice:",
    },
    { key: "typologie_de_plan", label: "Typologie de plan:" },
    {
      key: "precision_de_la_localisation",
      label: "Précision de la localisation:",
    },
    { key: "precision_de_la_protection", label: "Précision de la protection:" },
    {
      key: "description_de_l_iconographie",
      label: "Description de l'iconographie:",
    },
    { key: "typologie_de_la_protection", label: "Typologie de la protection:" },
    {
      key: "precision_sur_le_statut_de_l_edifice",
      label: "Précision sur le statut de l'édifice:",
    },
    { key: "reference_a_un_ensemble", label: "Référence à un ensemble:" },
    {
      key: "references_des_parties_constituantes_etudiees",
      label: "Références des parties constituantes étudiées:",
    },
    {
      key: "elements_remarquables_dans_l_edifice",
      label: "Éléments remarquables:",
    },
    { key: "remploi", label: "Remploi:" },
    {
      key: "siecle_de_la_campagne_principale_de_construction",
      label: "Siècle de la campagne principale:",
    },
    {
      key: "siecle_de_campagne_secondaire_de_construction",
      label: "Siècle de campagne secondaire:",
    },
    {
      key: "typologie_de_la_zone_de_protection",
      label: "Typologie de la zone de protection:",
    },
    { key: "statut_juridique_de_l_edifice", label: "Statut juridique:" },
    { key: "materiaux_de_la_couverture", label: "Matériaux de la couverture:" },
    {
      key: "couverts_ou_decouverts_du_jardin_de_l_edifice",
      label: "Couverts/découverts du jardin:",
    },
    {
      key: "vocable_pour_les_edifices_cultuels",
      label: "Vocable pour les édifices cultuels:",
    },
    { key: "typologie_du_couvrement", label: "Typologie du couvrement:" },
  ];

  return (
    <Circle center={[lat, lon]} radius={10} pathOptions={{ color: "blue" }}>
      <Popup>
        <div>
          <strong>{result.titre_editorial_de_la_notice}</strong>
          <Box
            sx={{
              maxHeight: "200px",
              overflowY: "auto",
              mt: 1,
            }}
          >
            {details.map(
              (detail, index) =>
                result[detail.key] && (
                  <p key={index}>
                    <strong>{detail.label}</strong> {result[detail.key]}
                  </p>
                )
            )}
            <p>D'autres infos sont disponibles</p>
          </Box>
        </div>
      </Popup>
    </Circle>
  );
}

export default HistoricMonumentsBuildings;
