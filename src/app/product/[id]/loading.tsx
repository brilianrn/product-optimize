import { SkeletonDetail } from "@/components/ui/skeleton_loader";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="h-6 bg-gray-200 rounded w-40 mb-8 animate-pulse"></div>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <SkeletonDetail />
        </div>
      </div>
    </main>
  );
}
