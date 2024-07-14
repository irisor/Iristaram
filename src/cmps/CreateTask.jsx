import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { HiOutlinePlus } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useKeyDown } from "../customHooks/useKeyDown";
import { useClickOutside } from "../customHooks/useClickOutside";

export function CreateTask({ onClose, onAddTask, groupId }) {
  const [itemData, setItemData] = useState(null);
  const board = useSelector((storeState) => storeState.boardModule.board);
  const inputRef = useRef(null);
  const formRef = useRef(null);
  useClickOutside(() => {
    onClose();
  }, formRef);

  useEffect(() => {
    inputRef.current?.focus();
  }, [itemData]);

  useKeyDown(() => {
    onClose();
  }, ["Escape"]);

  useKeyDown(
    (ev) => {
      AddTask(ev);
    },
    ["Enter"]
  );

  function AddTask(ev) {
    ev?.preventDefault();
    ev?.stopPropagation();
    setItemData(null);

    if (itemData) {
      onAddTask(groupId, itemData);
    } else {
      ev.stopPropagation();
      setItemData({ title: "" });
    }
  }

  function onChangeTitle(title) {
    setItemData((prevData) => ({ ...prevData, title }));
  }

  // function onAddEmptyItem(ev) {
  // 	ev.stopPropagation()
  // 	ev.preventDefault()
  // 	setItemData({ title: '' })
  // }

  return (
    <form ref={formRef} className="create-task">
      <textarea
        type="text"
        className="task-placeholder"
        value={itemData?.title}
        onChange={(ev) => onChangeTitle(ev.target.value)}
        onKeyDown={() => {
          useKeyDown(() => AddTask(), ["Enter"]);
          useKeyDown(() => onClose(), ["Escape"]);
        }}
        placeholder="Enter a title for this card..."
        ref={inputRef}
      />
      <button
        className="btn new-item-save btn-color-bold blue"
        onClick={(ev) => AddTask(ev)}
      >
        Add a card
      </button>
      <button className="btn icon new-item-close" onClick={onClose}>
        <IconContext.Provider value={{ color: "inherit" }}>
          <AiOutlineClose />
        </IconContext.Provider>
      </button>
    </form>
  );
}
