import { useState, ChangeEvent, useEffect } from "react";
import FilterCard from "./FilterCard";
import {
  addQueryParam,
  getFilterParam,
  removeQueryParam,
} from "@/utils/queryEdit";
import { FilterProps } from "@/type";

export default function StringFilter({
  name,
  label,
  editing,
  disabled,
}: FilterProps) {
  const [savedValue, setSavedValue] = useState("");
  const [tempValue, setTempValue] = useState("");
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    const currVal = getFilterParam(name, "string");
    if (currVal) {
      setSavedValue(currVal.value as string);
      setTempValue(currVal.value as string);
      setIsSet(true);
    }
  }, []);

  const onSave = () => {
    if (tempValue.trim()) {
      setSavedValue(tempValue);
      setIsSet(true);
      addQueryParam(getQueryParam(), name);
      return true;
    } else {
      alert("Please select values before saving.");
      return false;
    }
  };
  const onCancel = () => {
    setTempValue(savedValue);
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTempValue(event.target.value);
  };
  const onRemove = () => {
    removeQueryParam(name);
    setIsSet(false);
  };
  const getQueryParam = () => {
    // using temp value since saved value might not be updated yet
    return `${name}="${tempValue}"`;
  };
  return (
    <div>
      <FilterCard
        title={label}
        isSet={isSet}
        onSave={onSave}
        onCancel={onCancel}
        onRemove={onRemove}
        editing={editing}
        disabled={disabled}
        savedView={() => (
          <div className="filter-input filter-saved string-filter">
            {savedValue}
          </div>
        )}
        editView={() => (
          <div>
            <input
              className="filter-input string-filter"
              type="text"
              value={tempValue}
              onChange={onChange}
            ></input>
          </div>
        )}
      />
    </div>
  );
}
