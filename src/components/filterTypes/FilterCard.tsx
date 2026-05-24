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

// This component wraps around each each type of filter, providing the
// edit/save/cancel/remove buttons and logic.
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
  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editing.isEditing) {
      handleSave();
    }
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
    <div className={`filter-card ${editing.isEditing && "active-filter-card"}`}>
      <div className="filter-name">{title}</div>
      <form className="filter-input-controls" onSubmit={handleFormSubmit}>
        {isSet && renderRangeType()}
        {editing.isEditing ? editView() : isSet && savedView()}
        {!editing.isEditing &&
          (isSet ? (
            <div className="filter-controls-container">
              <button
                className="edit-btn"
                disabled={disabled}
                onClick={() => editing.onEditStart()}
                type="button"
                title="Edit Filter"
              >
                <i className="fas fa-pen-square"></i>
              </button>
              <button
                className="cancel-btn"
                disabled={disabled}
                onClick={handleRemove}
                title="Remove Filter"
                type="button"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ) : (
            <button
              className="add-btn"
              disabled={disabled}
              type="button"
              onClick={() => editing.onEditStart()}
            >
              add filter
            </button>
          ))}
        {editing.isEditing && (
          <div className="filter-controls-container">
            <button className="save-btn" type="submit" title="Save Filter">
              <i className="fas fa-save"></i>
            </button>
            <button
              className="cancel-btn"
              onClick={handleCancel}
              title="Cancel Edit"
              type="button"
            >
              <i className="fas fa-window-close"></i>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
