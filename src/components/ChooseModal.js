import { useState, useEffect } from "react";

const ChooseModal = (props) => {
  const [items, setitems] = useState(props.items);
  const [selectedItem, setSelectedItem] = useState(props.itemsForResults);

  const addItem = (elem) => {
    setSelectedItem([...selectedItem, elem]);
    setitems(items.filter((item) => item.id != elem.id));
  };

  const deleteItem = (elem) => {
    setSelectedItem(selectedItem.filter((item) => item.id != elem.id));
    setitems([...items, elem]);
  };

  useEffect(() => {
    setSelectedItem(props.itemsForResults);
    const ids = selectedItem?.map((item) => item.id);
    setitems(props.items.filter((elem) => !ids.includes(elem.id)));
  }, [props.items, props.itemsForResults]);

  return props.isOpen ? (
    <div
      className="absolute bg-white border modal p-8 rounded"
      style={{
        top: "50%",
        left: "50%",
        zIndex: "10",
        transform: "translate(-50%, -50%)",
        width: "60vw",
        height: "60vh",
      }}
    >
      <div
        className=""
        style={{
          position: "relative",
        }}
      >
        <div
          className="space-y-2"
          style={{
            height: "max-content",
          }}
        >
          <div className="flex">
            <div className="border-b text-lg">Заголовок</div>
            <button
              className="margin-right"
              onClick={() => props.onClose(false)}
            >
              Закрыть
            </button>
          </div>
          <input
            type="text"
            placeholder="Поиск"
            className="w-full element-input-style"
          />
          <div
            className="container-model-choose w-full"
            style={{
              height: "20vh",
            }}
          >
            {items.map((elem) => (
              <div
                onClick={() => addItem(elem)}
                className="ml-4 text-sm element-st"
              >
                {elem.name}
              </div>
            ))}
          </div>
          <div
            className=" w-full"
            style={{
              height: "20vh",
            }}
          >
            {selectedItem?.map((elem) => (
              <div className="smile">
                <span className="ml-4 text-sm element-st">{elem.name}</span>
                <button
                  onClick={() => {
                    deleteItem(elem);
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              props.onSave(selectedItem);
              props.onClose(false);
            }}
            className="button-classic"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export { ChooseModal };
