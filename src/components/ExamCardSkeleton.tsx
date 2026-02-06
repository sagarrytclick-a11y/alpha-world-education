export default function ExamCardSkeleton() {
  return (
    <div className="border border-gray-400 shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-0 rounded-[2.5rem] overflow-hidden bg-white flex flex-col h-full">
      {/* Skeleton for image */}
      <div className="h-48 bg-gray-200 animate-pulse" />
      
      <div className="p-8 pb-4 pt-8">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-2xl animate-pulse" />
          <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse" />
        </div>
        
        {/* Skeleton for title */}
        <div className="h-8 bg-gray-200 rounded-lg animate-pulse mb-3" />
        <div className="h-8 bg-gray-200 rounded-lg animate-pulse mb-2 w-3/4" />
        
        {/* Skeleton for badge */}
        <div className="w-20 h-5 bg-gray-200 rounded-md animate-pulse" />
      </div>

      <div className="p-8 pt-0 flex flex-col flex-grow">
        {/* Skeleton for description */}
        <div className="space-y-2 mb-8">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
        </div>
        
        {/* Skeleton for details */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
          </div>
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Skeleton for button */}
        <div className="mt-auto">
          <div className="w-full h-14 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}
