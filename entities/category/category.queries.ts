import { useQuery } from "@tanstack/react-query"
import { getCategoryQuery } from "./category.api"

const keys = {
    root: () => ['category'],
    getCategory: () => [...keys.root(), "getCategory"] as const,
}


export function useGetCategoryQuery() {
    return useQuery({
        queryKey: keys.getCategory(),
        queryFn: getCategoryQuery
    })
}