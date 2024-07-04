import React, { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "./CarCard";

interface Car {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
}

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "https://test.tspb.su/test-task/vehicles"
        );
        setCars(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchCars();
  }, []);

  const handleSort = (field: string) => {
    setSortField(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleEditCar = async (updatedCar: Car) => {
    try {
      await axios.put(
        `https://test.tspb.su/test-task/vehicles/${updatedCar.id}`,
        updatedCar
      );
      setCars((prevCars) =>
        prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
      );
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
    }
  };

  const handleDeleteCar = async (id: number) => {
    try {
      await axios.delete(`https://test.tspb.su/test-task/vehicles/${id}`);
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении данных:", error);
    }
  };

  const sortedCars = cars.sort((a, b) => {
    if (sortField === null) {
      return 0;
    }
    if (sortDirection === "asc") {
      return a[sortField as keyof Car] > b[sortField as keyof Car] ? 1 : -1;
    } else {
      return a[sortField as keyof Car] < b[sortField as keyof Car] ? 1 : -1;
    }
  });

  return (
    <div>
      <h1>Список автомобилей</h1>
      <div className="sort-options">
        <button onClick={() => handleSort("year")}>Сортировать по году</button>
        <button onClick={() => handleSort("price")}>Сортировать по цене</button>
      </div>
      <div className="car-list">
        {sortedCars.map((car) => (
          <CarCard
            key={car.id}
            {...car}
            onEdit={handleEditCar}
            onDelete={handleDeleteCar}
          />
        ))}
      </div>
    </div>
  );
};

export default CarList;
