import { useEffect, useState } from "react";
import MapInfo from "./filterTabs/MapInfo";
import Difficulty from "./filterTabs/Difficulty";
import MapStats from "./filterTabs/MapStats";
import Dates from "./filterTabs/Dates";
import "./FilterMenu.css";

interface MenuProps {
  defaultMenu: HTMLElement;
}

export default function FilterMenu({ defaultMenu }: MenuProps) {
  const [currTab, setCurrTab] = useState("mapInfo");

  const tabs = [
    { id: "mapInfo", label: "Map Info" },
    { id: "difficulty", label: "Difficulty" },
    { id: "mapStats", label: "Map Stats" },
    { id: "dates", label: "Dates" },
    { id: "tags", label: "User Tags" },
  ];

  // if the user has tags selected, then show the site's original div,
  // otherwise hide the original div and show the custom component
  useEffect(() => {
    if (currTab == "tags") {
      defaultMenu.style.display = "grid";
    } else {
      defaultMenu.style.display = "none";
    }
  }, [currTab]);

  const renderCurrTab = () => {
    switch (currTab) {
      case "mapInfo":
        return <MapInfo />;
      case "difficulty":
        return <Difficulty />;
      case "mapStats":
        return <MapStats />;
      case "dates":
        return <Dates />;
      // shouldn't render anything for this one since this is the default div on the site
      case "tags":
        return <></>;
      default:
        return <div>ERROR</div>;
    }
  };

  return (
    <div className="menu-container">
      <div className="tab-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${currTab == tab.id ? "selected-tab" : ""}`}
            onClick={() => setCurrTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderCurrTab()}
    </div>
  );
}
