import { required } from "./helper";

export const config = () => {
  return {
    PORT: process.env.PORT || required("PORT"),
  };
};

export const dbConfig = () => {
  return {
    URL: process.env.MONGO_URL || required("MONGO_URL"),
    DBNAME: process.env.DBNAME || required("DBNAME"),
    DBUSER: process.env.DBUSER || required("DBUSER"),
    DBPASSWD: process.env.DBPASSWD || required("DBPASSWD"),
  };
};
