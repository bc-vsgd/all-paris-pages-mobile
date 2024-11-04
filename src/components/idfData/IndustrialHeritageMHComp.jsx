import React from "react";
import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function IndustrialHeritageMHComp({ result }) {
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
          {result.immeuble && <strong>{result.immeuble}</strong>}
          {result.type_archi && <p>{result.type_archi}</p>}
          {result.protection && <p>{result.protection}</p>}
        </div>
      </Popup>
    </Circle>
  );
}

export default IndustrialHeritageMHComp;
