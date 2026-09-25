import { auth } from "../index";

export const useLogout = () => () => auth.signOut();
