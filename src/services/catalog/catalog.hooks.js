import { useQuery } from "@tanstack/react-query";
import { catalogService } from "./catalog.service";

export const catalogKeys = {
  all: ["catalog"],

  departments: () => [...catalogKeys.all, "departments"],

  department: (id) => [...catalogKeys.all, "department", id],
};

export function useDepartments() {
  return useQuery({
    queryKey: catalogKeys.departments(),
    queryFn: catalogService.getDepartments,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDepartment(id) {
  return useQuery({
    queryKey: catalogKeys.department(id),
    queryFn: () => catalogService.getDepartmentById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}
