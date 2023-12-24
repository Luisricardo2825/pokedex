export const buildQuery = (query?: {
  [x: string]: string | number | undefined;
}) => {
  const queryParams = new URLSearchParams();
  const entries = Object.entries(query || {});
  entries.forEach(([name, value]) => {
    if (value) queryParams.set(name, `${value}`);
  });
  return queryParams.toString();
};
