export default function RangeTypeSelect({
  rangeType,
  onSelect,
}: {
  rangeType: string;
  onSelect: (choice: string) => void;
}) {
  const handleChange = (btnClicked: string) => {
    let newType = btnClicked;
    switch (btnClicked) {
      case "<":
        newType = rangeType === "<" ? "<=" : "<";
        break;
      case "<=":
        newType = "<";
        break;
      case ">":
        newType = rangeType === ">" ? ">=" : ">";
        break;
      case ">=":
        newType = ">";
        break;
      default:
        break;
    }
    onSelect(newType);
  };

  return (
    <div>
      <button
        className={`num-type-btn ${rangeType === "=" ? "selected-num-type" : ""}`}
        onClick={() => handleChange("=")}
      >
        =
      </button>
      <button
        className={`num-type-btn ${rangeType === "<" || rangeType === "<=" ? "selected-num-type" : ""}`}
        onClick={() => handleChange("<")}
      >
        {rangeType == "<=" ? "<=" : "<"}
      </button>
      <button
        className={`num-type-btn ${rangeType === ">" || rangeType === ">=" ? "selected-num-type" : ""}`}
        onClick={() => handleChange(">")}
      >
        {rangeType === ">=" ? ">=" : ">"}
      </button>
      <button
        className={`num-type-btn ${rangeType === "range" ? "selected-num-type" : ""}`}
        onClick={() => handleChange("range")}
      >
        range
      </button>
    </div>
  );
}
