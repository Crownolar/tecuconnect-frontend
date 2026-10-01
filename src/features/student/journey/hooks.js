import { useQuery } from "@tanstack/react-query";
import { journeyService } from "./journey.service";

export const journeyKeys = {
  all: ["student-journey"],
  detail: () => [...journeyKeys.all, "detail"],
};

export function useStudentJourney() {
  return useQuery({
    queryKey: journeyKeys.detail(),
    queryFn: journeyService.getJourney,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
  });
}