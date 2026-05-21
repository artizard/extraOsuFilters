import { useState, ChangeEvent, useEffect } from "react";
import FilterCard from "./FilterCard";
import {
  addQueryParam,
  getFilterParam,
  removeQueryParam,
} from "@/content/queryEdit";
import RangeTypeSelect from "./RangeType";

interface FilterProps {
  name: string;
  label: string;
}
interface Values {
  min: string | null;
  max: string | null;
}

export default function DateFilter({ name, label }: FilterProps) {
  const [rangeType, setRangeType] = useState("="); // can be =, <, <=, >, >=, range
  const [savedValue, setSavedValue] = useState<Values>({
    min: "",
    max: "",
  });
  const [tempValue, setTempValue] = useState<Values>(savedValue);
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    const currVal = getFilterParam(name, true);
    if (currVal) {
      setRangeType(currVal.rangeType);
      let newVal;
      if (currVal.rangeType === "range") {
        newVal = {
          min: currVal.value.min,
          max: currVal.value.max,
        } as Values;
        setSavedValue(newVal);
      } else {
        newVal = {
          min: currVal.value,
          max: null,
        } as Values;
      }
      setSavedValue(newVal);
      setTempValue(newVal);
      setIsSet(true);
    }
  }, []);

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
  const onCancel = () => {
    setTempValue(savedValue);
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>, maxMin: string) => {
    setTempValue((prev) => ({ ...prev, [maxMin]: event.target.value }));
  };
  const onRemove = () => {
    removeQueryParam(name);
    setIsSet(false);
  };
  const getQueryParam = () => {
    // using temp value since saved value might not be updated yet
    if (rangeType == "range") {
      return `${name}>${tempValue.min} ${name}<${tempValue.max}`;
    } else {
      return `${name}${rangeType}${tempValue.min}`;
    }
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
              <div className="filter-input filter-saved date-filter">
                {savedValue.min}
              </div>{" "}
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
              <div>
                <input
                  className="filter-input date-filter"
                  type="date"
                  value={tempValue.min || ""}
                  onChange={(e) => onChange(e, "min")}
                ></input>
                <input
                  className="filter-input date-filter"
                  type="date"
                  value={tempValue.max || ""}
                  onChange={(e) => onChange(e, "max")}
                ></input>
              </div>
            ) : (
              <input
                className="filter-input date-filter"
                type="date"
                value={tempValue.min || ""}
                onChange={(e) => onChange(e, "min")}
              ></input>
            )}
          </div>
        </div>
      )}
    />
  );
}
