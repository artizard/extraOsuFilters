import { ChangeEvent } from "react";
import FilterCard from "./FilterCard";
import { addQueryParam } from "@/utils/queryEdit";
import RangeTypeSelect from "./RangeType";
import { useRangeFilter } from "@/hooks/useRangeFilter";

interface FilterProps {
  name: string;
  label: string;
}
export default function DateFilter({ name, label }: FilterProps) {
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
  } = useRangeFilter<string>({ name, filterType: "date", parseValue: String });

  const onSave = () => {
    if (tempValue.min == null) {
      alert("You must choose a date before saving.");
      return false;
    }
    const today = new Date();
    const lowValue = new Date(tempValue.min);
    today.setHours(0, 0, 0, 0);
    lowValue.setHours(0, 0, 0, 0);

    if (isNaN(lowValue.getTime())) {
      alert("Please enter a valid date.");
      return false;
    }
    if (rangeType === ">" || rangeType === "range" || rangeType === "=") {
      if (lowValue.getTime() > today.getTime()) {
        alert("You cannot search for dates in the future.");
        return false;
      }
    }

    if (rangeType === "range") {
      if (tempValue.max == null) {
        alert("You must choose both dates before saving.");
        return false;
      }
      const highValue = new Date(tempValue.max);
      highValue.setHours(0, 0, 0, 0);
      if (isNaN(highValue.getTime())) {
        alert("Please enter a valid date.");
        return false;
      }
      if (lowValue.getTime() >= highValue.getTime()) {
        alert(
          "The higher date should not be lower than or equal to the lower date.",
        );
        return false;
      }
    }

    setSavedValue(tempValue);
    setIsSet(true);
    addQueryParam(getQueryParam(), name);
    return true;
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>, maxMin: string) => {
    setTempValue((prev) => ({ ...prev, [maxMin]: event.target.value }));
  };

  return (
    <FilterCard
      title={label}
      isSet={isSet}
      rangeType={rangeType}
      onSave={onSave}
      onCancel={onCancel}
      onRemove={onRemove}
      savedView={() => (
        <div>
          {rangeType === "range" ? (
            <div className="range-container">
              <div className="filter-input filter-saved date-filter">
                {savedValue.min}
              </div>
              <div>to</div>
              <div className="filter-input filter-saved date-filter">
                {savedValue.max}
              </div>
            </div>
          ) : (
            <div className="filter-input filter-saved date-filter">
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
              <div className="range-container">
                <input
                  className="filter-input date-filter"
                  type="date"
                  value={tempValue.min ?? ""}
                  onChange={(e) => onChange(e, "min")}
                ></input>
                <div>to</div>
                <input
                  className="filter-input date-filter"
                  type="date"
                  value={tempValue.max ?? ""}
                  onChange={(e) => onChange(e, "max")}
                ></input>
              </div>
            ) : (
              <input
                className="filter-input date-filter"
                type="date"
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
