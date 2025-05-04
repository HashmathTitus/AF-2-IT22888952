import React, { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const WorldMap = () => {
  const [tooltipContent, setTooltipContent] = useState("");

  const handleMouseEnter = (geo) => {
    setTooltipContent(geo.properties.name);
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  const mapStyles = {
    width: "100%",
    height: "500px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginTop: "20px",
  };

  const iconStyles = {
    fontSize: "24px",
    color: "#007BFF",
    marginBottom: "10px",
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <FaGlobe style={iconStyles} />
      <h2>World Map</h2>
      <div style={mapStyles}>
        <ComposableMap data-tip="">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => handleMouseEnter(geo)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    default: { fill: "#D6D6DA", outline: "none" },
                    hover: { fill: "#F53", outline: "none" },
                    pressed: { fill: "#E42", outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
        <ReactTooltip>{tooltipContent}</ReactTooltip>
      </div>
    </div>
  );
};

export default WorldMap;