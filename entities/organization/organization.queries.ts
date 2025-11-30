import { useQuery } from "@tanstack/react-query";
import { getOrganizationQuery } from "./organization.api";

const keys = {
  root: () => ['organization'],
  getOrganization: () => [...keys.root(), 'getOrganization'] as const,
};


export function useGetOrganization(){
    return useQuery({
        queryKey:keys.getOrganization(),
        queryFn: getOrganizationQuery
    })
}