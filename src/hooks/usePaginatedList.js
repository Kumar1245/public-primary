import { useInfiniteQuery } from "@tanstack/react-query";

const usePaginatedList = ({
  queryKey,
  fetchFn,
  enabled = true,
  limit = 21,
  initialPage = 1,
}) => {
  return useInfiniteQuery({
    queryKey,

    queryFn: async ({ pageParam = initialPage }) => {
      const res = await fetchFn({
        page: pageParam,
        limit,
      });

      /**
       *  IMPORTANT ERROR HANDLING
       * If backend sends failure → throw error
       */
      if (!res) {
        throw new Error("No response from server");
      }

      if (res.status === "failure") {
        throw new Error(res.message || "Something went wrong");
      }

      return res;
    },

    /**
     * Pagination logic
     */
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.data || lastPage.data.length === 0) {
        return undefined;
      }
      return allPages.length + 1;
    },

    enabled,
    keepPreviousData: false,
    retry: false,
  });
};

export default usePaginatedList;
