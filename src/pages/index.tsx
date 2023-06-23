import Table from "@/components/table";
import { useState } from "react";
import { snacks } from "../../data";

export interface InitalFilters {
  product_weight: "asc" | "des" | null;
  product_price: "asc" | "des" | null;
  calories: "asc" | "des" | null;
  id: "asc" | "des" | null;
  name: "asc" | "des" | null;
  ingredients: "asc" | "des" | null;
}
const initalFilters: InitalFilters = {
  product_weight: null,
  product_price: null,
  calories: null,
  id: null,
  name: null,
  ingredients: null,
};

export default function Home() {
  const [data, setData] = useState(snacks);
  const [appliedFilters, setAppliedFilters] = useState(initalFilters);
  const [searchText, setSearchText] = useState("");

  const search = (searchInputValue: string) => {
    setSearchText(searchInputValue);
    const filteredData = snacks.filter((item) => {
      return (
        item.product_name
          .toLowerCase()
          .includes(searchInputValue.toLowerCase()) ||
        item.ingredients
          .join(", ")
          .toLowerCase()
          .includes(searchInputValue.toLowerCase())
      );
    });
    setData(filteredData);
  };

  const sort = (
    type:
      | "id"
      | "product_weight"
      | "product_price"
      | "calories"
      | "name"
      | "ingredients"
  ) => {
    let sortedData = [...data];

    // if no filter applied or filter applied in des order, sort in asc order
    if (appliedFilters[type] === "des" || appliedFilters[type] === null) {
      sortedData = sortedData.sort((a, b) => {
        if (type === "product_weight") {
          return parseInt(a[type]) - parseInt(b[type]);
        }
        if (type === "product_price") {
          // item is in gram, get the numeric part
          const aPrice = parseInt(a["product_weight"].split(" ")[0]);
          const bPrice = parseInt(b["product_weight"].split(" ")[0]);
          return aPrice - bPrice;
        }
        if (type === "calories") {
          return a[type] - b[type];
        }
        if (type === "id") {
          return a[type] - b[type];
        }
        if (type === "name") {
          // Sort name in asc order
          return a["product_name"].localeCompare(b["product_name"]);
        }
        if (type === "ingredients") {
          // Sort by number of ingredients
          return a["ingredients"].length - b["ingredients"].length;
        }
        return 0;
      });
      // set the filter to asc, which shows current filter is applied in asc order
      setAppliedFilters({
        ...initalFilters,
        [type]: "asc",
      });
    }
    // If the filter applied in asc order, sort in des order
    else if (appliedFilters[type] === "asc") {
      sortedData = sortedData.sort((a, b) => {
        if (type === "product_weight") {
          return parseInt(b[type]) - parseInt(a[type]);
        }
        if (type === "product_price") {
          // item is in gram, get the numeric part
          const aPrice = parseInt(a["product_weight"].split(" ")[0]);
          const bPrice = parseInt(b["product_weight"].split(" ")[0]);
          return bPrice - aPrice;
        }
        if (type === "calories") {
          return b[type] - a[type];
        }
        if (type === "id") {
          return b[type] - a[type];
        }
        if (type === "name") {
          // Sort name in des order
          return b["product_name"].localeCompare(a["product_name"]);
        }
        if (type === "ingredients") {
          // Sort by number of ingredients
          return b["ingredients"].length - a["ingredients"].length;
        }
        return 0;
      });
      // set the filter to des, which shows current filter is applied in des order
      setAppliedFilters({
        ...initalFilters,
        [type]: "des",
      });
    }
    setData(sortedData);
  };

  return (
    <main
      className={`flex flex-col gap-10 min-h-screen items-center  bg-slate-300 text-black py-10`}
    >
      <div className="w-full h-full">
        <h1 className="text-4xl px-2">Snack table</h1>
      </div>
      <input
        type="text"
        className="w-full mx-5 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        placeholder="Search with Products or ingredients"
        value={searchText}
        onChange={(e) => {
          search(e.target.value);
        }}
      />
      <Table appliedFilters={appliedFilters} sort={sort} data={data} />
    </main>
  );
}
