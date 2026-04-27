export function formatValidationErrors(error: ApiError) {
  if (!error.errors) {
    return undefined;
  }

  const messages = Object.entries(error.errors).flatMap(([field, values]) =>
    values.map((value) => `${field}: ${value}`),
  );

  return messages.length > 0 ? messages.join("\n") : undefined;
}
