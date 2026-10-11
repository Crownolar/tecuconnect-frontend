import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { notificationsService } from "../notifications.service";

export const notificationKeys = {
  all: ["student", "notifications"],

  list: (params = {}) => [...notificationKeys.all, "list", params],

  unreadCount: () => [...notificationKeys.all, "unread-count"],
};

export function useNotifications(params = {}) {
  return useQuery({
    queryKey: notificationKeys.list(params),
    queryFn: () => notificationsService.getNotifications(params),
    staleTime: 30 * 1000,
  });
}

export function useUnreadNotificationCount() {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: () => notificationsService.getUnreadCount(),
    staleTime: 30 * 1000,
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId) =>
      notificationsService.markAsRead(notificationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationsService.markAllAsRead(),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });
    },
  });
}
