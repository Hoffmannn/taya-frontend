import axios from "axios";
import { removeNonDigitsFromString } from "../utils/basic";

export const getCEP = (cep) => {
  return axios
    .get(`https://viacep.com.br/ws/${removeNonDigitsFromString(cep)}/json`)
    .catch((err) => console.log(err));
};
