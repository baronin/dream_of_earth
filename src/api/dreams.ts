import { DreamDataForm } from "../../@types/dreamDataForm";
import firebase from "./firebase";

export const create = async (dream: DreamDataForm) => {
  await firebase.firestore().collection("dreams").doc().set(dream);
};

export default { create };
