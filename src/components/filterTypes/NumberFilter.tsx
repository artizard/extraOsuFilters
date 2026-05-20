import { useState, ChangeEvent } from "react";
import FilterCard from "./FilterCard";
import { addQueryParam, removeQueryParam } from "@/content/queryEdit";

interface FilterProps {
  name: string;
  label: string;
  defaultValue: number;
}
interface Values {
  min: number;
  max: number;
}
export default function NumberFilter({
  name,
  label,
  defaultValue,
}: FilterProps) {
  const [numberType, setNumberType] = useState("="); // can be =, <, <=, >, >=, range
  const [savedValue, setSavedValue] = useState<Values>({
    min: defaultValue,
    max: defaultValue + 1,
  });
  const [tempValue, setTempValue] = useState<Values>(savedValue);
  const onSave = () => {
    setSavedValue(tempValue);
    addQueryParam(getQueryParam(), name);
    return true;
  };
  const onCancel = () => {
    setTempValue(savedValue);
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>, maxMin: string) => {
    setTempValue((prev) => ({ ...prev, [maxMin]: Number(event.target.value) }));
  };
  const onRemove = () => {
    removeQueryParam(name);
  };
  const getQueryParam = () => {
    // using temp value since saved value might not be updated yet
    if (numberType == "range") {
      return `${name}>${tempValue.min} ${name}<${tempValue.max}`;
    } else {
      return `${name}${numberType}${tempValue.min}`;
    }
  };

  return (
    <FilterCard
      name={name}
      title={label}
      onSave={onSave}
      onCancel={onCancel}
      onRemove={onRemove}
      savedView={() => (
        <div>
          {numberType === "range" ? (
            <div>
              <div className="filter-input filter-saved num-filter">
                {savedValue.min}
              </div>{" "}
              <div className="filter-input filter-saved num-filter">
                {savedValue.max}
              </div>
            </div>
          ) : (
            <div className="filter-input filter-saved num-filter">
              {savedValue.min}
            </div>
          )}
        </div>
      )}
      editView={() => (
        <div>
          <NumberTypeSelect
            numberType={numberType}
            onSelect={(choice) => setNumberType(choice)}
          />
          <div>
            {numberType === "range" ? (
              <div>
                <input
                  className="filter-input num-filter"
                  type="number"
                  value={tempValue.min}
                  onChange={(e) => onChange(e, "min")}
                ></input>
                <input
                  className="filter-input num-filter"
                  type="number"
                  value={tempValue.max}
                  onChange={(e) => onChange(e, "max")}
                ></input>
              </div>
            ) : (
              <input
                className="filter-input num-filter"
                type="number"
                value={tempValue.min}
                onChange={(e) => onChange(e, "min")}
              ></input>
            )}
          </div>
        </div>
      )}
    />
  );
}

function NumberTypeSelect({
  numberType,
  onSelect,
}: {
  numberType: string;
  onSelect: (choice: string) => void;
}) {
  const handleChange = (btnClicked: string) => {
    let newType = btnClicked;
    switch (btnClicked) {
      case "<":
        newType = numberType === "<" ? "<=" : "<";
        break;
      case "<=":
        newType = "<";
        break;
      case ">":
        newType = numberType === ">" ? ">=" : ">";
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
        className={`num-type-btn ${numberType === "=" ? "selected-num-type" : ""}`}
        onClick={() => handleChange("=")}
      >
        =
      </button>
      <button
        className={`num-type-btn ${numberType === "<" || numberType === "<=" ? "selected-num-type" : ""}`}
        onClick={() => handleChange("<")}
      >
        {numberType == "<=" ? "<=" : "<"}
      </button>
      <button
        className={`num-type-btn ${numberType === ">" || numberType === ">=" ? "selected-num-type" : ""}`}
        onClick={() => handleChange(">")}
      >
        {numberType === ">=" ? ">=" : ">"}
      </button>
      <button
        className={`num-type-btn ${numberType === "range" ? "selected-num-type" : ""}`}
        onClick={() => handleChange("range")}
      >
        range
      </button>
    </div>
  );
}
