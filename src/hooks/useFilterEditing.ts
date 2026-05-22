import { Editing } from "@/type";
import { useState } from "react";

interface FilterEditProps {
  editing: Editing;
  disabled: boolean;
}

export function useFilterEditing() {
  const [currEditing, setCurrEditing] = useState<string | null>(null);
  const getEditProps = (filterName: string): FilterEditProps => ({
    editing: {
      isEditing: filterName === currEditing,
      onEditStart: () => setCurrEditing(filterName),
      onEditEnd: () => setCurrEditing(null),
    },
    disabled: currEditing !== null && currEditing !== filterName,
  });
  return { getEditProps };
}
