import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import axios from "axios";

export const useGetRequest = (url) => {
  return useSWR(
    url,
    async (url) =>
      await axios
        .get(url)
        .then((res) => res.data)
        .catch((err) => err?.response || err)
  );
};

export const usePutRequest = (url) => {
  return useSWRMutation(
    url,
    async (url, { arg }) =>
      await axios
        .put(url, arg)
        .then((res) => res.data)
        .catch((err) => err?.response || err)
  );
};

export const usePostRequest = (url) => {
  return useSWRMutation(
    url,
    async (url, { arg }) =>
      await axios
        .post(url, arg)
        .then((res) => res.data)
        .catch((err) => err?.response || err)
  );
};

export const useDeleteRequest = (url) => {
  return useSWRMutation(
    url,
    async (url, { arg }) =>
      await axios
        .delete(url, arg)
        .then((res) => res.data)
        .catch((err) => err?.response || err)
  );
};
