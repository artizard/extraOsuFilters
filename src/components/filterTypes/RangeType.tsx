export default function RangeTypeSelect({
  rangeType,
  onSelect,
}: {
  rangeType: string;
  onSelect: (choice: string) => void;
}) {
  return (
    <div className="range-type-container">
      <button
        className={`range-type-btn ${rangeType === "=" ? "selected-range-type" : ""}`}
        title="Equal to"
        onClick={() => onSelect("=")}
      >
        =
      </button>
      <button
        className={`range-type-btn ${rangeType === "<" ? "selected-range-type" : ""}`}
        title="Less than"
        onClick={() => onSelect("<")}
      >
        {"<"}
      </button>
      <button
        className={`range-type-btn ${rangeType === ">" ? "selected-range-type" : ""}`}
        title="Greater than"
        onClick={() => onSelect(">")}
      >
        {">"}
      </button>
      <button
        className={`range-type-btn ${rangeType === "<=" ? "selected-range-type" : ""}`}
        title="Less than or equal to"
        onClick={() => onSelect("<=")}
      >
        &le;
      </button>
      <button
        className={`range-type-btn ${rangeType === ">=" ? "selected-range-type" : ""}`}
        title="Greater than or equal to"
        onClick={() => onSelect(">=")}
      >
        &ge;
      </button>
      <button
        className={`range-type-btn ${rangeType === "range" ? "selected-range-type" : ""}`}
        title="Range of values (inclusive)"
        onClick={() => onSelect("range")}
      >
        range
      </button>
    </div>
  );
}
