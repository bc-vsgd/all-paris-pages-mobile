import React from "react";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

function HousesOfFamousComp({ result }) {
  let siteInternetEtAutresLiens = [];
  try {
    siteInternetEtAutresLiens = JSON.parse(
      result.site_internet_et_autres_liens
    );
  } catch (error) {
    console.error("Error parsing site_internet_et_autres_liens:", error);
  }

  return (
    <Circle
      center={[
        result.coordonnees_geographiques.lat,
        result.coordonnees_geographiques.lon,
      ]}
      radius={10}
      pathOptions={{ color: "blue" }}
      eventHandlers={{
        click: () => {},
      }}
    >
      <Popup>
        <div>
          <strong>{result.nom}</strong>
          <Box
            sx={{
              maxHeight: "200px",
              overflowY: "auto",
              mt: 1,
            }}
          >
            {result.nom_usuel && <p>{result.nom_usuel}</p>}
            {result.adresse_de_l_entree_du_public && (
              <p>{result.adresse_de_l_entree_du_public}</p>
            )}
            {result.auteur_nom_de_l_illustre && (
              <p>
                <strong>Illustre:</strong> {result.auteur_nom_de_l_illustre}
              </p>
            )}
            {result.description && <p>{result.description}</p>}
            {Array.isArray(siteInternetEtAutresLiens) &&
              siteInternetEtAutresLiens.length > 0 && (
                <div>
                  <p>
                    <strong>Sites, liens:</strong>
                  </p>
                  <ul>
                    {siteInternetEtAutresLiens.map((lien, index) => (
                      <li key={index}>
                        <a
                          href={lien}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {lien}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            {Array.isArray(result.types) && result.types.length > 0 && (
              <div>
                <p>
                  <strong>Types:</strong>
                </p>
                <ul>
                  {result.types.map((type, index) => (
                    <li key={index}>{type}</li>
                  ))}
                </ul>
              </div>
            )}
          </Box>
        </div>
      </Popup>
    </Circle>
  );
}

export default HousesOfFamousComp;
