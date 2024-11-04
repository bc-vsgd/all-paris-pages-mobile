import React from "react";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

function SportsSitesComp({ result }) {
  if (!result.longitude || !result.latitude) {
    return null;
  }

  const details = [
    { key: "historique_et_description", label: "Historique et description:" },
    {
      key: "statut_de_la_propriete_actuelle",
      label: "Statut de la propriété actuelle:",
    },
    { key: "proprietaire", label: "Propriétaire:" },
    { key: "concepteur_s", label: "Concepteur(s):" },
    { key: "entrepreneur_s", label: "Entrepreneur(s):" },
    { key: "autre_s_intervenant_s", label: "Autre(s) intervenant(s):" },
    { key: "maitre_s_d_ouvrage", label: "Maître(s) d'ouvrage:" },
    { key: "datation", label: "Datation:" },
    { key: "periode_de_construction", label: "Période de construction:" },
    { key: "site_olympique", label: "Site olympique:" },
    {
      key: "type_de_reconnaissance_patrimoniale",
      label: "Type de reconnaissance patrimoniale:",
    },
  ];

  return (
    <Circle
      center={[result.latitude, result.longitude]}
      radius={10}
      pathOptions={{ color: "blue" }}
    >
      <Popup>
        <div>
          <strong>{result.appellation}</strong>
          <Box
            sx={{
              maxHeight: "200px",
              overflowY: "auto",
              mt: 1,
            }}
          >
            {result.url_image && (
              <div>
                <img
                  src={result.url_image}
                  alt={result.appellation}
                  style={{ height: "100px", objectFit: "contain" }}
                />
                <p>
                  {result.adresse_com}, {result.commune}
                </p>
              </div>
            )}
            {details.map(
              (detail, index) =>
                result[detail.key] && (
                  <p key={index}>
                    <strong>{detail.label}</strong> {result[detail.key]}
                  </p>
                )
            )}
            {result.typologie &&
              Array.isArray(result.typologie) &&
              result.typologie.length > 0 && (
                <p>
                  <strong>Typologie:</strong> {result.typologie.join(", ")}
                </p>
              )}
            {result.denomination &&
              Array.isArray(result.denomination) &&
              result.denomination.length > 0 && (
                <p>
                  <strong>Dénomination:</strong>{" "}
                  {result.denomination.join(", ")}
                </p>
              )}
            {result.date_s_de_reference &&
              Array.isArray(result.date_s_de_reference) &&
              result.date_s_de_reference.length > 0 && (
                <p>
                  <strong>Date(s) de référence:</strong>{" "}
                  {result.date_s_de_reference.join(", ")}
                </p>
              )}
          </Box>
        </div>
      </Popup>
    </Circle>
  );
}

export default SportsSitesComp;
