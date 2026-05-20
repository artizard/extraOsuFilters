import { useState, ChangeEvent } from "react";
import FilterCard from "./FilterCard";
import { addQueryParam, removeQueryParam } from "@/content/queryEdit";

interface FilterProps {
  name: string;
  label: string;
}
export default function StringFilter({ name, label }: FilterProps) {
  const [savedValue, setSavedValue] = useState("");
  const [tempValue, setTempValue] = useState("");

  const onSave = () => {
    if (tempValue.trim()) {
      setSavedValue(tempValue);
      addQueryParam(getQueryParam(), name);
      return true;
    } else {
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
  };
  const getQueryParam = () => {
    // using temp value since saved value might not be updated yet
    return `${name}="${tempValue}"`;
  };
  return (
    <div>
      <FilterCard
        name={name}
        title={label}
        onSave={onSave}
        onCancel={onCancel}
        onRemove={onRemove}
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
