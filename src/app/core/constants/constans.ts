export const api_url = "https://localhost:7110/api";

export const apiEndPoint = {
  Auth: {
    Register: `${api_url}/Authentication/register`,
    Login: `${api_url}/Authentication/Login`,
  },
  User: {
    GetUserById: `${api_url}/User/GetUserById`, // Add this endpoint
  },
};

export const LocalStorage = {
  token: "",
};