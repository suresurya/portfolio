const PageSkeleton = () => {
    return (
      <div className="w-full min-h-[60vh] p-4 sm:p-8 flex flex-col gap-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4">
          <div className="size-20 sm:size-24 rounded-full bg-gray-500/20" />
          <div className="space-y-3 flex-1 max-w-md">
            <div className="h-6 w-3/4 rounded-md bg-gray-500/20" />
            <div className="h-4 w-1/2 rounded-md bg-gray-500/20" />
          </div>
        </div>
  
        {/* Content Paragraph Skeleton */}
        <div className="space-y-3 max-w-3xl">
          <div className="h-4 w-full rounded-md bg-gray-500/10" />
          <div className="h-4 w-[90%] rounded-md bg-gray-500/10" />
          <div className="h-4 w-[95%] rounded-md bg-gray-500/10" />
          <div className="h-4 w-[80%] rounded-md bg-gray-500/10" />
        </div>
  
        {/* Buttons Skeleton */}
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="h-10 w-32 rounded-xl bg-gray-500/20" />
          <div className="h-10 w-40 rounded-xl bg-gray-500/20" />
          <div className="h-10 w-36 rounded-xl bg-gray-500/20" />
        </div>
      </div>
    );
  };
  
  export default PageSkeleton;
  
