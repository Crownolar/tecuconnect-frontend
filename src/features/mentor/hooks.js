import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { mentorService } from "./mentor.service";
import { mentorshipKeys, mentorshipService } from "./mentorship";

export const mentorKeys = {
  all: ["mentor"],

  dashboard: () => [...mentorKeys.all, "dashboard"],

  students: () => [...mentorKeys.all, "students"],

  reviews: () => [...mentorKeys.all, "reviews"],

  milestone: (milestoneId) => [...mentorKeys.all, "milestone", milestoneId],
};

export function useMentorDashboard() {
  return useQuery({
    queryKey: mentorKeys.dashboard(),
    queryFn: mentorService.getDashboard,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useAssignedStudents() {
  return useQuery({
    queryKey: mentorKeys.students(),
    queryFn: mentorService.getStudents,
    staleTime: 30 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export function usePendingReviews() {
  return useQuery({
    queryKey: mentorKeys.reviews(),
    queryFn: mentorService.getPendingReviews,
    staleTime: 15 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export function useMentorMilestone(milestoneId) {
  return useQuery({
    queryKey: mentorKeys.milestone(milestoneId),
    queryFn: () => mentorService.getMilestone(milestoneId),
    enabled: Boolean(milestoneId),
    staleTime: 15 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useReviewMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ milestoneId, payload }) =>
      mentorService.reviewMilestone(milestoneId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: mentorKeys.reviews(),
      });

      queryClient.invalidateQueries({
        queryKey: mentorKeys.dashboard(),
      });

      if (variables?.milestoneId) {
        queryClient.invalidateQueries({
          queryKey: mentorKeys.milestone(variables.milestoneId),
        });
      }
    },
  });
}

export function useUpdateMentorshipRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, payload }) =>
      mentorshipService.updateRequest(requestId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mentorshipKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: ["mentor", "students"],
      });

      queryClient.invalidateQueries({
        queryKey: ["mentor", "dashboard"],
      });
    },
  });
}

export function useMentorReviewContext() {
  const studentsQuery = useAssignedStudents();
  const reviewsQuery = usePendingReviews();

  const students = studentsQuery.data ?? [];
  const reviews = reviewsQuery.data ?? [];

  const assignedStudentIds = new Set(students.map((student) => student.id));

  const mentorReviews = reviews.filter((review) =>
    assignedStudentIds.has(review.studentId),
  );

  return {
    students,
    reviews: mentorReviews,

    studentsQuery,
    reviewsQuery,

    isLoading: studentsQuery.isLoading || reviewsQuery.isLoading,

    isError: studentsQuery.isError || reviewsQuery.isError,

    error: studentsQuery.error || reviewsQuery.error,
  };
}
