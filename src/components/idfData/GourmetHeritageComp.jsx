import React from "react";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";

function GourmetHeritageComp({ result }) {
  if (!result.wgs84 || !result.wgs84.lon || !result.wgs84.lat) {
    return null;
  }

  return (
    <Circle
      center={[result.wgs84.lat, result.wgs84.lon]}
      radius={10}
      pathOptions={{ color: "blue" }}
    >
      <Popup>
        <div>
          {result.deno && <strong>{result.deno}</strong>}
          <Box
            sx={{
              maxHeight: "200px",
              overflowY: "auto",
              mt: 1,
            }}
          >
            {result.etab && (
              <p>
                <strong>Établissement:</strong> {result.etab}, {result.adresse},{" "}
                {result.commune}
              </p>
            )}
            {result.patri_bat && <p>{result.patri_bat}</p>}
            {result.patri_pays && <p>{result.patri_pays}</p>}
            {result.comm && <p>{result.comm}</p>}
            {result.activite && <p>{result.activite}</p>}
            {result.siecle && <p>{result.siecle}</p>}
            {result.datation && <p>{result.datation}</p>}
            {result.produit && <p>{result.produit}</p>}
            {result.nat_prod && <p>{result.nat_prod}</p>}
            {result.compo && <p>{result.compo}</p>}
            {result.appel && <p>{result.appel}</p>}
            {result.outil && <p>{result.outil}</p>}
            {result.condi && <p>{result.condi}</p>}
            {result.even && <p>{result.even}</p>}
            {result.sources && <p>{result.sources}</p>}
            {result.label && <p>{result.label}</p>}
            {result.etat && <p>{result.etat}</p>}
            {result.degre && <p>{result.degre}</p>}
            {result.classement && <p>{result.classement}</p>}
            {result.img && <p>{result.img}</p>}
          </Box>
        </div>
      </Popup>
    </Circle>
  );
}

export default GourmetHeritageComp;
