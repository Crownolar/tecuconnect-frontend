export function getApiErrorMessage(error) {
  if (!error) {
    return "Something went wrong.";
  }

  if (error.status === 401) {
    return "Your session has expired. Please sign in again.";
  }

  if (error.status === 403) {
    return "You do not have permission to perform this action.";
  }

  if (error.status === 404) {
    return "The requested resource was not found.";
  }

  if (error.status >= 500) {
    return "The server encountered an error. Please try again.";
  }

  return (
    error.message ||
    "Something went wrong. Please try again."
  );
}