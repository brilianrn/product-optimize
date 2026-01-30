import { Category, Product, ProductsResponse } from "@/types/product_types";

const API_BASE = "https://dummyjson.com";

export const fetchProducts = async (params?: {
  category?: string;
  sortBy?: "asc" | "desc";
  limit?: number;
}): Promise<ProductsResponse> => {
  try {
    let url = `${API_BASE}/products`;

    if (params?.category && params.category !== "all") {
      url = `${API_BASE}/products/category/${params.category}`;
    }

    url += `?limit=${params?.limit || 30}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: ProductsResponse = await response.json();

    // Sort products if sortBy is provided
    if (params?.sortBy) {
      data.products.sort((a, b) => {
        if (params.sortBy === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE}/products/categories`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data: { slug: string; name: string }[] = await response.json();
    return data.map((cat) => cat.slug);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
