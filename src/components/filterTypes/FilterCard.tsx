import "./FilterCard.css";
import { Editing } from "@/type";

interface CardProps {
  title: string;
  isSet: boolean;
  rangeType?: string;
  savedView: () => React.ReactNode;
  editView: () => React.ReactNode;
  onSave: () => boolean;
  onCancel: () => void;
  onRemove: () => void;
  editing: Editing;
  disabled: boolean;
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
  editing,
  disabled,
}: CardProps) {
  const handleSave = () => {
    if (onSave()) {
      editing.onEditEnd();
    }
  };
  const handleCancel = () => {
    onCancel();
    editing.onEditEnd();
  };
  const handleRemove = () => {
    onRemove();
  };

  const renderRangeType = () => {
    if (rangeType === "no-prefix" || rangeType === "range") return null;
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
      <div className="filter-input-controls">
        {isSet && renderRangeType()}
        {editing.isEditing ? editView() : isSet && savedView()}
        {!editing.isEditing &&
          (isSet ? (
            <div className="filter-controls-container">
              <button
                className="edit-btn"
                onClick={() => editing.onEditStart()}
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
            <button
              className="add-btn"
              disabled={disabled}
              onClick={() => editing.onEditStart()}
            >
              add filter
            </button>
          ))}
        {editing.isEditing && (
          <div className="filter-controls-container">
            <button
              className="save-btn"
              onClick={handleSave}
              title="Save Filter"
            >
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
    </div>
  );
}
