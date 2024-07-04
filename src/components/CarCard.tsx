import React, { useState } from "react";

interface CarProps {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
  onEdit: (car: CarProps) => void;
  onDelete: (id: number) => void;
}

const CarCard: React.FC<CarProps> = ({
  id,
  name,
  model,
  year,
  color,
  price,
  latitude,
  longitude,
  onEdit,
  onDelete,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedModel, setEditedModel] = useState(model);
  const [editedPrice, setEditedPrice] = useState(price);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onEdit({
      id,
      name: editedName,
      model: editedModel,
      year,
      color,
      price: editedPrice,
      latitude,
      longitude,
      onEdit,
      onDelete,
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedName(name);
    setEditedModel(model);
    setEditedPrice(price);
  };

  return (
    <div className="car-card">
      {editing ? (
        <>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="text"
            value={editedModel}
            onChange={(e) => setEditedModel(e.target.value)}
          />
          <input
            type="number"
            value={editedPrice}
            onChange={(e) => setEditedPrice(Number(e.target.value))}
          />
          <br />
          <button className="save-button" onClick={handleSave}>
            Сохранить
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Отмена
          </button>
        </>
      ) : (
        <>
          <h2>
            {name} {model}
          </h2>
          <p>Год выпуска: {year}</p>
          <p>Цвет: {color}</p>
          <p>Цена: {price}</p>
          <button className="edit-button" onClick={handleEdit}>
            Изменить
          </button>
          <button className="delete-button" onClick={() => onDelete(id)}>
            Удалить
          </button>
        </>
      )}
    </div>
  );
};

export default CarCard;
