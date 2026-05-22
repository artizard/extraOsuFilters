export interface Editing {
  isEditing: boolean;
  onEditStart: () => void;
  onEditEnd: () => void;
}

export interface FilterProps {
  name: string;
  label: string;
  editing: Editing;
  disabled: boolean;
}
