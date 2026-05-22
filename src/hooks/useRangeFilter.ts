import { useState, useEffect } from "react";
import { getFilterParam, removeQueryParam } from "@/utils/queryEdit";

interface FilterProps<T> {
  name: string;
  filterType: "number" | "date";
  parseValue: (val: any) => T;
}
interface Values {
  min: number | null;
  max: number | null;
}

// This hook is for any filter that can store a range. This is to reuse some code, but it may be unecessary considering only two
// components use it but idk.
export function useRangeFilter<T>({
  name,
  filterType,
  parseValue,
}: FilterProps<T>) {
  const [rangeType, setRangeType] = useState("="); // can be =, <, <=, >, >=, range
  const [savedValue, setSavedValue] = useState<Values>({
    min: null,
    max: null,
  });
  const [tempValue, setTempValue] = useState<Values>(savedValue);
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    const currVal = getFilterParam(name, filterType);
    if (currVal) {
      setRangeType(currVal.rangeType);
      let newVal;
      if (currVal.rangeType === "range") {
        newVal = {
          min: parseValue(currVal.value.min),
          max: parseValue(currVal.value.max),
        } as Values;
        setSavedValue(newVal);
      } else {
        newVal = {
          min: parseValue(currVal.value),
          max: null,
        } as Values;
      }
      setSavedValue(newVal);
      setTempValue(newVal);
      setIsSet(true);
    }
  }, [name, filterType]);

  const onCancel = () => {
    setTempValue(savedValue);
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

  return {
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
  };
}
