import { useState } from "react";
import "./FilterCard.css";

interface CardProps {
  title: string;
  isSet: boolean;
  rangeType?: string;
  savedView: () => React.ReactNode;
  editView: () => React.ReactNode;
  onSave: () => boolean;
  onCancel: () => void;
  onRemove: () => void;
}

export default function FilterCard({
  title = "Filter Name",
  isSet,
  rangeType = "no-prefix",
  savedView,
  editView,
  onSave,
  onCancel,
  onRemove,
}: CardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (onSave()) {
      setIsEditing(false);
    }
  };
  const handleCancel = () => {
    onCancel();
    setIsEditing(false);
  };
  const handleRemove = () => {
    onRemove();
  };

  const renderRangeType = () => {
    if (rangeType === "no-prefix") return null;
    let symbol = rangeType;
    if (rangeType === "<=") {
      symbol = "\u2264";
    } else if (rangeType === ">=") {
      symbol = "\u2265";
    }
    return <div className="range-type-icon">{symbol}</div>;
  };

  return (
    <div className="filter-card">
      <div className="filter-name">{title}</div>
      {isSet && renderRangeType()}
      {isEditing ? editView() : isSet && savedView()}
      {!isEditing &&
        (isSet ? (
          <div className="filter-controls-container">
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              title="Edit Filter"
            >
              <i className="fas fa-pen-square"></i>
            </button>
            <button
              className="cancel-btn"
              onClick={handleRemove}
              title="Remove Filter"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ) : (
          <button className="add-btn" onClick={() => setIsEditing(true)}>
            Add Filter
          </button>
        ))}
      {isEditing && (
        <div className="filter-controls-container">
          <button className="save-btn" onClick={handleSave} title="Save Filter">
            <i className="fas fa-save"></i>
          </button>
          <button
            className="cancel-btn"
            onClick={handleCancel}
            title="Cancel Edit"
          >
            <i className="fas fa-window-close"></i>
          </button>
        </div>
      )}
    </div>
  );
}
