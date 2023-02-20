export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const bearerToken = "Bearer " + user.accessToken;

  if (user && user.accessToken) {
    // return { "x-access-token": bearerToken };
    return { "authorization": bearerToken };
  } else {
    return {};
  }
}
