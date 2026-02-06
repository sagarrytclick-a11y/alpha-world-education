// app/dashboard/loading.tsx
export default function Loading() {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="relative h-16 w-16">
          {/* Animated Orange Ring */}
          <div className="absolute h-full w-full rounded-full border-4 border-orange-100 border-t-orange-500 animate-spin"></div>
        </div>
      </div>
    );
  }