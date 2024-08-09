import { getRefreshToken, getToken, getUser } from "./secureStore";

type printData = {
  accessToken: string | null;
  refreshToken: string | null;
  user: string | null;
};

export const printSecureScore = async (msg: string) => {
  const data: printData = {
    accessToken: "",
    refreshToken: "",
    user: "",
  };
  data.accessToken = await getToken();
  data.refreshToken = await getRefreshToken();
  data.user = await getUser();
  console.log("-----------------------------------------");
  console.log(msg + " : Secure Store");
  Object.keys(data).forEach((key) => {
    console.log(key + ":" + data[key]);
  });
  console.log("-----------------------------------------");
};
