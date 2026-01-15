interface Category {
  id: string;
  name: string;
}

const reorderCategories = (categories: Category[]): Category[] => {
  // Find the category with id "all"
  const allCategory = categories.find((category) => category.id === "all");

  // If "all" category is found, filter it out and add it to the beginning
  if (allCategory) {
    return [
      allCategory,
      ...categories.filter((category) => category.id !== "all"),
    ];
  }

  // If "all" category is not found, return the original array
  return categories;
};

export default reorderCategories;
