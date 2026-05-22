import { ChangeEvent } from "react";
import FilterCard from "./FilterCard";
import { addQueryParam } from "@/utils/queryEdit";
import RangeTypeSelect from "./RangeType";
import { useRangeFilter } from "@/hooks/useRangeFilter";

interface FilterProps {
  name: string;
  label: string;
}

export default function NumberFilter({ name, label }: FilterProps) {
  const {
    rangeType,
    setRangeType,
    savedValue,
    setSavedValue,
    tempValue,
    setTempValue,
    isSet,
    setIsSet,
    onCancel,
    onRemove,
    getQueryParam,
  } = useRangeFilter<number>({
    name,
    filterType: "number",
    parseValue: Number,
  });

  const onSave = () => {
    if (tempValue.min === null) {
      alert("Please select values before saving.");
      return false;
    }
    if (tempValue.min < 0) {
      alert("You cannot choose negative values.");
      return false;
    }
    // check the second value only if it's actually used
    if (rangeType === "range") {
      if (tempValue.max === null) {
        alert("Please select values before saving.");
        return false;
      }
      if (tempValue.max <= tempValue.min) {
        alert(
          "Higher range value should not be lower than or equal to the lower value.",
        );
        return false;
      }
      if (tempValue.max < 0) {
        alert("You cannot choose negative values.");
        return false;
      }
    }

    setSavedValue(tempValue);
    setIsSet(true);
    addQueryParam(getQueryParam(), name);
    return true;
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>, maxMin: string) => {
    const val = event.target.value;
    setTempValue((prev) => ({
      ...prev,
      [maxMin]: val === "" ? null : Number(val),
    }));
  };

  return (
    <FilterCard
      title={label}
      isSet={isSet}
      onSave={onSave}
      onCancel={onCancel}
      onRemove={onRemove}
      savedView={() => (
        <div>
          {rangeType === "range" ? (
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
          <RangeTypeSelect
            rangeType={rangeType}
            onSelect={(choice) => setRangeType(choice)}
          />
          <div>
            {rangeType === "range" ? (
              <div>
                <input
                  className="filter-input num-filter"
                  type="number"
                  value={tempValue.min ?? ""}
                  onChange={(e) => onChange(e, "min")}
                ></input>
                <input
                  className="filter-input num-filter"
                  type="number"
                  value={tempValue.max ?? ""}
                  onChange={(e) => onChange(e, "max")}
                ></input>
              </div>
            ) : (
              <input
                className="filter-input num-filter"
                type="number"
                value={tempValue.min ?? ""}
                onChange={(e) => onChange(e, "min")}
              ></input>
            )}
          </div>
        </div>
      )}
    />
  );
}
