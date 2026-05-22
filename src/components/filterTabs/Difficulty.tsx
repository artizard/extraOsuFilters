import NumberFilter from "../filterTypes/NumberFilter";
import { useFilterEditing } from "@/hooks/useFilterEditing";

export default function Difficulty() {
  const { getEditProps } = useFilterEditing();

  const DIFFICULTY_FILTERS = [
    { name: "ar", label: "approach rate" },
    { name: "cs", label: "circle size" },
    { name: "od", label: "overall difficulty" },
    { name: "hp", label: "HP drain rate" },
    { name: "stars", label: "star rating" },
    { name: "bpm", label: "song BPM" },
  ];

  return (
    <div className="filter-screen">
      <span className="user-tag-picker__category">difficulty</span>
      <div className="filter-container">
        {DIFFICULTY_FILTERS.map((filter) => (
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
