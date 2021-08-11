import { DreamCategory } from "./dreamCategory";

export type DreamData = {
  id: string;
  fullName: string;
  email: string;
  country: { name: string } | string;
  acceptPrivacy: boolean;
  dreamContent: Blob | null | string;
  categories: DreamCategory[] | string[];
};
