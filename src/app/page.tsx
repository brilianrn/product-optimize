import { FilterBar } from "@/components/filter_bar/filter_bar";
import { ProductCard } from "@/components/product_card";
import { SkeletonGrid } from "@/components/ui/skeleton_loader";
import { fetchCategories, fetchProducts } from "@/lib/api_helper";
import { Suspense } from "react";

interface SearchParams {
  category?: string;
  sort?: "asc" | "desc";
}

const ProductGrid = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const productsData = await fetchProducts({
    category: searchParams.category,
    sortBy: searchParams.sort,
    limit: 30,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {productsData.products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 6} />
      ))}
    </div>
  );
};

export default async function ProductListingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const categories = await fetchCategories();
  const resolvedParams = await searchParams;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Product Catalog
        </h1>

        <FilterBar categories={categories} />

        <Suspense fallback={<SkeletonGrid />}>
          <ProductGrid searchParams={resolvedParams} />
        </Suspense>
      </div>
    </main>
  );
}
