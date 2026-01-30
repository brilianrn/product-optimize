import { ImageCarousel } from "@/components/image_carousel";
import { fetchProductById } from "@/lib/api_helper";
import Link from "next/link";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const resolvedParams = await params;
  const product = await fetchProductById(resolvedParams.id);

  const getAvailabilityColor = (status?: string) => {
    if (!status) return "bg-gray-100 text-gray-800";
    if (status.toLowerCase().includes("stock"))
      return "bg-green-100 text-green-800";
    if (status.toLowerCase().includes("low"))
      return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ImageCarousel images={product.images} title={product.title} />

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                  {product.brand} • {product.category}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    -{product.discountPercentage.toFixed(0)}% OFF
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-xl mr-2">★</span>
                  <span className="text-lg font-semibold">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-500 ml-1">/5</span>
                </div>
                {product.availabilityStatus && (
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${getAvailabilityColor(product.availabilityStatus)}`}
                  >
                    {product.availabilityStatus}
                  </span>
                )}
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Product Details
                </h2>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">Stock</dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {product.stock} units
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Category</dt>
                    <dd className="text-lg font-semibold text-gray-900 capitalize">
                      {product.category}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Brand</dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {product.brand}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Rating</dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      {product.rating} ★
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
