import { memo } from "react";

let cache = new Map();
export function fetchData(url) {
  if (!cache.has(url)) {
    cache.set(url, getData(url));
  }
  return cache.get(url);
}

const getData = (url) => {
  let status = "pending";
  let result;
  let startTime = performance.now();
  while (performance.now() - startTime < 500) {
    // Do nothing for 500 ms to emulate extremely slow code
  }
  let suspender = fetch(url)
    .then((res) => res.json())
    .then((data) => {
      status = "success";
      result = data;
    })
    .catch((error) => {
      status = "error";
      result = error;
    });

  return {
    read() {
      if (status === "pending") {
        throw suspender; // Suspends the rendering until the promise resolves
      } else if (status === "error") {
        throw result; // In case of error
      } else if (status === "success") {
        return result; // Returns the data
      }
    },
  };
};

let resource = fetchData("https://jsonplaceholder.typicode.com/comments");

export const SlowData = memo(({ id }) => {
  resource = fetchData(`https://jsonplaceholder.typicode.com/comments/${id}`);
  const data = resource.read(); // Suspends if data is still loading

  return (
    <ul style={{ listStyle: "none" }}>
      {Array.isArray(data) ? data.map((d) => (
        <li key={d.id}>{d.id}</li>
      )) : data.id}
    </ul>
  );
});