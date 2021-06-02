import { DreamCategory } from "./dreamCategory";

export type DreamDataForm = {
  fullName: string;
  email: string;
  country: { name: string } | string;
  acceptPrivacy: boolean;
  videoDream?: Blob | [] | null;
  textDream?: string;
  categories: DreamCategory[] | string[];
};
