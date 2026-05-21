export default function RangeTypeSelect({
  rangeType,
  onSelect,
}: {
  rangeType: string;
  onSelect: (choice: string) => void;
}) {
  return (
    <div>
      <button
        className={`num-type-btn ${rangeType === "=" ? "selected-num-type" : ""}`}
        title="Equal to"
        onClick={() => onSelect("=")}
      >
        =
      </button>
      <button
        className={`num-type-btn ${rangeType === "<" ? "selected-num-type" : ""}`}
        title="Less than"
        onClick={() => onSelect("<")}
      >
        {"<"}
      </button>
      <button
        className={`num-type-btn ${rangeType === ">" ? "selected-num-type" : ""}`}
        title="Greater than"
        onClick={() => onSelect(">")}
      >
        {">"}
      </button>
      <button
        className={`num-type-btn ${rangeType === "<=" ? "selected-num-type" : ""}`}
        title="Less than or equal to"
        onClick={() => onSelect("<=")}
      >
        &le;
      </button>
      <button
        className={`num-type-btn ${rangeType === ">=" ? "selected-num-type" : ""}`}
        title="Greater than or equal to"
        onClick={() => onSelect(">=")}
      >
        &ge;
      </button>
      <button
        className={`num-type-btn ${rangeType === "range" ? "selected-num-type" : ""}`}
        title="Range of values (inclusive)"
        onClick={() => onSelect("range")}
      >
        range
      </button>
    </div>
  );
}
