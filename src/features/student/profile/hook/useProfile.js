import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { profileService } from "../profile.service";

export const profileKeys = {
  all: ["student", "profile"],

  detail: () => [
    ...profileKeys.all,
    "detail",
  ],
};

export function useProfile() {
  return useQuery({
    queryKey: profileKeys.detail(),
    queryFn: profileService.getProfile,
    staleTime: 2 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      profileService.updateProfile(payload),

    onSuccess: (profile) => {
      queryClient.setQueryData(
        profileKeys.detail(),
        profile,
      );

      queryClient.invalidateQueries({
        queryKey: ["student"],
      });
    },
  });
}