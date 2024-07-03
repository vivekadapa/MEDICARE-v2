import { useGetRequest, usePostRequest } from "../hooks/fetcher";

export default function TestPage() {
  const { data: someData, mutate } = useGetRequest("");
  const { data, trigger } = usePostRequest("");
  return (
    <>
      <button onClick={() => trigger({ sample: 1 })}>Click me</button>
    </>
  );
}
