export async function client(url: string) {
  const response = await fetch(url);
  // await sleep(1000);
  if (response.ok) {
    const results = await response.json();
    if (results) {
      return results;
    }
    return Promise.reject(Error("Not found page"));
  }
  const error = { message: "unsuccessful response" };
  return Promise.reject(error);
}

// eslint-disable-next-line no-unused-vars
function sleep(ms = 3000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default client;
