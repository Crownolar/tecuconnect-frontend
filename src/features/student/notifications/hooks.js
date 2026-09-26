import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  notificationsService,
} from "./notifications.service";

export const notificationKeys = {
  all: ["student", "notifications"],

  list: () => [
    ...notificationKeys.all,
    "list",
  ],
};

export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn:
      notificationsService.getNotifications,
    staleTime: 30 * 1000,
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:
      notificationsService.markAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.list(),
      });
    },
  });
}