export async function fetchUtil(url, options, removeCookie) {
  const res = await fetch(url, options);
  if (res.status === 200) {
    return res;
  }
  if (res.status === 401) {
    removeCookie("jwtToken");
    throw "unauthorized";
  }
}
