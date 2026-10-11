import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "./notification.service";

export const notificationKeys = {
  all: ["staff", "notifications"],
  list: (params) => [...notificationKeys.all, "list", params],
  unread: () => [...notificationKeys.all, "unread"],
};

export function useStaffNotifications(params = {}) {
  return useQuery({
    queryKey: notificationKeys.list(params),
    queryFn: () => notificationService.getNotifications(params),
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useStaffUnreadCount() {
  return useQuery({
    queryKey: notificationKeys.unread(),
    queryFn: notificationService.getUnreadCount,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useMarkStaffNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}

export function useMarkAllStaffNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}
