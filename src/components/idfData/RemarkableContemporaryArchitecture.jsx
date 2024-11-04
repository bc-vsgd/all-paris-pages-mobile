import React from "react";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function RemarkableContemporaryArchitecture({ result }) {
  if (
    !result.geo_point_2d ||
    !result.geo_point_2d.lon ||
    !result.geo_point_2d.lat
  ) {
    return null;
  }

  return (
    <Circle
      center={[result.geo_point_2d.lat, result.geo_point_2d.lon]}
      radius={10}
      pathOptions={{ color: "blue" }}
    >
      <Popup>
        <div>
          {result.titre_cour && <strong>{result.titre_cour}</strong>}
          {(result.adresse || result.commune) && (
            <p>
              {result.adresse}, {result.commune}
            </p>
          )}
          {result.siecle_s && <p>{result.siecle_s}</p>}
          {result.ouvert_au && (
            <p>
              <strong>Ouvert au public:</strong> {result.ouvert_au}
            </p>
          )}
          {result.propriet && (
            <p>
              <strong>Propriétaire:</strong> {result.propriet}
            </p>
          )}
          {result.denominat && <p>{result.denominat}</p>}
        </div>
      </Popup>
    </Circle>
  );
}

export default RemarkableContemporaryArchitecture;
