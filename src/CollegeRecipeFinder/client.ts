import axios from "axios";
import { resolveTypeReferenceDirective } from "typescript";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;


export const BASE_URL = `${REMOTE_SERVER}`;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const RECIPES_API = `${REMOTE_SERVER}/api/recipes`;

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};
export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const likeRecipe = async (userId: string, recipeId: string) => {
  const response = await axiosWithCredentials.post(`${RECIPES_API}/like`, {
    userId,
    recipeId,
  });
  return response.data;
};

export const getLikedRecipes = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${RECIPES_API}/liked/${userId}`);
  return response.data;
};

export const followChef = async (userId: string, chefId: string) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/follow`, {
    userId,
    chefId,
  });
  return response.data;
};

export const getFollowedChefs = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/following`);
  return response.data
}

export const getRecipeDetails = async (recipeId: string) => {
  const response = await axios.get(`${RECIPES_API}/${recipeId}`);
  return response.data;
};

export const getRecipes = async () => {
  try {
    const response = await axios.get(RECIPES_API);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const searchRecipe = async (query: string) => {
  try {
      const response = await axios.get(`${RECIPES_API}/search/${query}`);
      return response.data; // Return the response data
  } catch (error) {
      console.error("Error searching for recipes");
      throw error;
  }
};


