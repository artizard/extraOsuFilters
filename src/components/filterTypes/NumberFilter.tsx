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
  min: number | null;
  max: number | null;
}
export default function NumberFilter({ name, label }: FilterProps) {
  const [rangeType, setRangeType] = useState("="); // can be =, <, <=, >, >=, range
  const [savedValue, setSavedValue] = useState<Values>({
    min: null,
    max: null,
  });
  const [tempValue, setTempValue] = useState<Values>({ min: null, max: null });
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    const currVal = getFilterParam(name, "number");
    if (currVal) {
      setRangeType(currVal.rangeType);
      let newVal;
      if (currVal.rangeType === "range") {
        newVal = {
          min: Number(currVal.value.min),
          max: Number(currVal.value.max),
        } as Values;
        setSavedValue(newVal);
      } else {
        newVal = {
          min: Number(currVal.value),
          max: null,
        } as Values;
      }
      setSavedValue(newVal);
      setTempValue(newVal);
      setIsSet(true);
    }
  }, []);

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
  const onCancel = () => {
    setTempValue(savedValue);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>, maxMin: string) => {
    setTempValue((prev) => ({ ...prev, [maxMin]: Number(event.target.value) }));
  };
  const onRemove = () => {
    removeQueryParam(name);
    setIsSet(false);
  };
  const getQueryParam = () => {
    // using temp value since saved value might not be updated yet
    if (rangeType == "range") {
      return `${name}>=${tempValue.min} ${name}<=${tempValue.max}`;
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
                  value={tempValue.min || ""}
                  onChange={(e) => onChange(e, "min")}
                ></input>
                <input
                  className="filter-input num-filter"
                  type="number"
                  value={tempValue.max || ""}
                  onChange={(e) => onChange(e, "max")}
                ></input>
              </div>
            ) : (
              <input
                className="filter-input num-filter"
                type="number"
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
