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

export interface OfficePayload {
  ref_id: string;
}

export interface OfficeDeletePayload extends OfficePayload {}

export interface OfficeClientOfficePayload extends OfficePayload {}

export interface OfficeState extends CommonState {
  data: Office[];
}

export interface ClientOfficeState extends CommonState {
  data: Office | null;
}
