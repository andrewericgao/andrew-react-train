import { useQuery } from '@tanstack/react-query';

const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('No network response -- see error');
  return response.json();
};

export const useJsonQuery = (url) => {
  const { data, isLoading, error } = useQuery([url], () => fetchJson(url));
  return [data, isLoading, error];
};