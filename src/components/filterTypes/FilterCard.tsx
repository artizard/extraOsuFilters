import { useEffect, useState } from "react";
import "./FilterCard.css";
import { isFilterSet } from "@/content/queryEdit";

interface CardProps {
  name: string;
  title: string;
  savedView: () => React.ReactNode;
  editView: () => React.ReactNode;
  onSave: () => boolean;
  onCancel: () => void;
  onRemove: () => void;
}

export default function FilterCard({
  name,
  title = "Filter Name",
  savedView,
  editView,
  onSave,
  onCancel,
  onRemove,
}: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    if (isFilterSet(name)) {
      setIsSet(true);
    }
  }, []);

  const handleSave = () => {
    if (onSave()) {
      setIsEditing(false);
      if (!isSet) setIsSet(true);
    }
  };
  const handleCancel = () => {
    onCancel();
    setIsEditing(false);
  };
  const handleRemove = () => {
    onRemove();
    console.log("TEST");
    setIsSet(false);
  };

  return (
    <div className="filter-card">
      <div>{title}</div>
      {isEditing ? editView() : isSet && savedView()}
      {!isEditing &&
        (isSet ? (
          <div>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="cancel-btn" onClick={handleRemove}>
              Remove Filter
            </button>
          </div>
        ) : (
          <button className="add-btn" onClick={() => setIsEditing(true)}>
            Add Filter
          </button>
        ))}
      {isEditing && (
        <div>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}
