import { DreamCategory } from "./dreamCategory";

export type DreamData = {
  id: string;
  fullName: string;
  email: string;
  country: { name: string } | string;
  acceptPrivacy: boolean;
  dreamContent: string;
  categories: DreamCategory[] | string[];
};
