import { useFilterEditing } from "@/hooks/useFilterEditing";
import StringFilter from "../filterTypes/StringFilter";

export default function MapInfo() {
  const { getEditProps } = useFilterEditing();

  const MAP_INFO_FILTERS = [
    { name: "artist", label: "artist name" },
    { name: "title", label: "song title" },
    { name: "source", label: "song source/origin" },
    { name: "creator", label: "mapper name" },
    { name: "difficulty", label: "difficulty name" },
  ];

  return (
    <div className="filter-screen">
      <span className="user-tag-picker__category">map info</span>
      <div className="filter-container">
        {MAP_INFO_FILTERS.map((filter) => (
          <StringFilter
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
