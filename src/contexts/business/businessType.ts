import { CommonState } from "contexts/types";

export interface Office {
  name: string;
  image: string;
  action: string;
  description: string;
  priority: number;
  body: string;
  ref_id?: string;
  create_at: Date;
}

 export interface OfficeDeletePayload {
  ref_id: string;
}

export interface OfficeState extends CommonState {
  data: Office[];
}

