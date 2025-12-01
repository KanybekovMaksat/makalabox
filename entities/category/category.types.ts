import { z } from "zod";
import { CategorySchema } from "./category.contracts";

export type CategorySchema = z.infer<typeof CategorySchema>