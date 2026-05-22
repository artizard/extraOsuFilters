import { useFilterEditing } from "@/hooks/useFilterEditing";
import NumberFilter from "../filterTypes/NumberFilter";

export default function MapStats() {
  const { getEditProps } = useFilterEditing();

  const MAP_STATS_FILTERS = [
    { name: "length", label: "song length" },
    { name: "favourites", label: "favorite count" },
    { name: "circles", label: "number of circles" },
    { name: "sliders", label: "sliders" },
    { name: "keys", label: "number of keys (mania)" },
  ];

  return (
    <div className="filter-screen">
      <span className="user-tag-picker__category">map stats</span>
      <div className="filter-container">
        {MAP_STATS_FILTERS.map((filter) => (
          <NumberFilter
            key={filter.name}
            name={filter.name}
            label={filter.label}
            {...getEditProps(filter.name)}
          />
        ))}
      </div>
    </div>
  );
}
