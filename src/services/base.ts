import axios from "axios";

export const getList = async () => {
  const result = await axios.get('https://contact.herokuapp.com/contact')
  return result.data
};
