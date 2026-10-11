import { Title } from "@mantine/core";
import { useState, useEffect } from "react";
import CategoryTableSort from "../components/TableSort";
import { Category } from "../common/types";
import { appProps } from "../common/types";
import { ERROR } from "../common/utils";
import { deleteCategoryRequest } from "../common/categoryApi";

export default function Categories({
  backendURL,
  displayError,
  toggleLoader,
}: appProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  async function fetchCategories() {
    toggleLoader(true);
    try {
      const res = await fetch(`${backendURL}/categories`);
      if (!res.ok) {
        displayError(res.statusText);
      } else {
        const jsonObj = await res.json();
        console.log(jsonObj);
        setCategories(jsonObj);
      }
      toggleLoader(false);
    } catch (err) {
      displayError(ERROR.SERVER_CONNECTION);
    }
  }

    async function deleteCategory(category: Category) {
    // ask for admin password
    const password = prompt("Enter admin password");
    const result = await deleteCategoryRequest(
      backendURL,
      category._id,
      password
    );

    if (result.ok) {
      // if request succeeded, fetch new list of categories
      fetchCategories();
    } else {
      displayError(result.message);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Title mb={20}>All categories ({categories.length})</Title>
      <CategoryTableSort
        deleteHandler={deleteCategory}
        data={categories}
        enableSearchBar={true}
      />
    </>
  );
}
