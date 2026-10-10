import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { mentorKeys } from "../hooks";
import { assessmentService } from "./assessment.service";

export const assessmentKeys = {
  all: ["mentor", "assessments"],
  list: (studentId) => [...assessmentKeys.all, "list", studentId],
};

export function useStudentAssessments(studentId) {
  return useQuery({
    queryKey: assessmentKeys.list(studentId),
    queryFn: () => assessmentService.getAssessments({ studentId }),
    enabled: Boolean(studentId),
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useCreateAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assessmentService.createAssessment,
    onSuccess: (_, variables) => {
      if (variables?.studentId) {
        queryClient.invalidateQueries({
          queryKey: assessmentKeys.list(variables.studentId),
        });
      }

      queryClient.invalidateQueries({
        queryKey: mentorKeys.dashboard(),
      });

      queryClient.invalidateQueries({
        queryKey: mentorKeys.students(),
      });
    },
  });
}
