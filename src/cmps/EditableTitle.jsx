import { useState } from 'react';

export function EditableTitle({ initialTitle, onUpdate }) {
  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    onUpdate(title);
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      ) : (
        <h2 onClick={handleTitleClick}>{title}</h2>
      )}
    </div>
  );
}
