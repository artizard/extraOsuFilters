export default function RangeTypeSelect({
  rangeType,
  onSelect,
}: {
  rangeType: string;
  onSelect: (choice: string) => void;
}) {
  // i needed to preventDefault so the input doesn't flash when swapping range types
  const handleSelect = (e: React.MouseEvent, choice: string) => {
    e.preventDefault();
    onSelect(choice);
  };
  return (
    <div className="range-type-container">
      <button
        className={`range-type-btn ${rangeType === "=" ? "selected-range-type" : ""}`}
        title="Equal to"
        onMouseDown={(e) => handleSelect(e, "=")}
      >
        =
      </button>
      <button
        className={`range-type-btn ${rangeType === "<" ? "selected-range-type" : ""}`}
        title="Less than"
        onMouseDown={(e) => handleSelect(e, "<")}
      >
        {"<"}
      </button>
      <button
        className={`range-type-btn ${rangeType === ">" ? "selected-range-type" : ""}`}
        title="Greater than"
        onMouseDown={(e) => handleSelect(e, ">")}
      >
        {">"}
      </button>
      <button
        className={`range-type-btn ${rangeType === "<=" ? "selected-range-type" : ""}`}
        title="Less than or equal to"
        onMouseDown={(e) => handleSelect(e, "<=")}
      >
        &le;
      </button>
      <button
        className={`range-type-btn ${rangeType === ">=" ? "selected-range-type" : ""}`}
        title="Greater than or equal to"
        onMouseDown={(e) => handleSelect(e, ">=")}
      >
        &ge;
      </button>
      <button
        className={`range-type-btn ${rangeType === "range" ? "selected-range-type" : ""}`}
        title="Range of values (inclusive)"
        onMouseDown={(e) => handleSelect(e, "range")}
      >
        range
      </button>
    </div>
  );
}
