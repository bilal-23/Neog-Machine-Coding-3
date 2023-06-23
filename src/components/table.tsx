import { InitalFilters } from "@/pages";
import React from "react";

interface Props {
  appliedFilters: InitalFilters;
  sort: (
    type:
      | "id"
      | "product_weight"
      | "product_price"
      | "calories"
      | "name"
      | "ingredients"
  ) => void;
  data: {
    id: number;
    product_name: string;
    product_weight: string;
    price: number;
    calories: number;
    ingredients: string[];
  }[];
}

const Table: React.FC<Props> = ({ appliedFilters, sort, data }) => {
  return (
    <table className="w-full min-h-full bg-white divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => sort("id")}
          >
            ID
            {appliedFilters.id === "asc" && "▲"}
            {appliedFilters.id === "des" && "▼"}
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => sort("name")}
          >
            Product Name
            {appliedFilters.name === "asc" && "▲"}
            {appliedFilters.name === "des" && "▼"}
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => sort("product_weight")}
          >
            Product Weight
            {appliedFilters.product_weight === "asc" && "▲"}
            {appliedFilters.product_weight === "des" && "▼"}
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => sort("product_price")}
          >
            Price
            {appliedFilters.product_price === "asc" && "▲"}
            {appliedFilters.product_price === "des" && "▼"}
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => sort("calories")}
          >
            Calories
            {appliedFilters.calories === "asc" && "▲"}
            {appliedFilters.calories === "des" && "▼"}
          </th>
          <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => sort("ingredients")}
          >
            Ingredients
            {appliedFilters.ingredients === "asc" && "▲"}
            {appliedFilters.ingredients === "des" && "▼"}
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 text-black">
        {data.map((item) => (
          <tr key={item.id}>
            <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.product_name}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {item.product_weight}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.calories}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {item.ingredients.join(", ")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
