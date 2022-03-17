import { required } from "./helper";
import { ApplicationConfig } from "./type";

export const config = (): ApplicationConfig => {
  return {
    PORT: process.env.PORT || required("PORT"),
  };
};
