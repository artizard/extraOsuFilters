import DateFilter from "../filterTypes/DateFilter";
import { useFilterEditing } from "@/hooks/useFilterEditing";

export default function Dates() {
  const { getEditProps } = useFilterEditing();

  const DATE_FILTERS = [
    { name: "created", label: "date created" },
    { name: "updated", label: "date of last update" },
    { name: "ranked", label: "date ranked" },
  ];

  return (
    <div className="filter-screen">
      <span className="user-tag-picker__category">dates</span>
      <div className="filter-container">
        {DATE_FILTERS.map((filter) => (
          <DateFilter
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
