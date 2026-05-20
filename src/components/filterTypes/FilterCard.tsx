import { useState } from "react";
import "./FilterCard.css";

interface CardProps {
  title: string;
  savedView: () => React.ReactNode;
  editView: () => React.ReactNode;
  onSave: () => void;
  onCancel: () => void;
}

export default function FilterCard({
  title = "Filter Name",
  savedView,
  editView,
  onSave,
  onCancel,
}: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSet, setIsSet] = useState(false);

  const handleSave = () => {
    onSave();
    setIsEditing(false);
    if (!isSet) setIsSet(true);
  };
  const handleCancel = () => {
    onCancel();
    setIsEditing(false);
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
            <button className="cancel-btn" onClick={() => setIsSet(false)}>
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
