// caseTypeMock.ts
export interface CaseType {
  label: string;
  color:
    | "primary"
    | "secondary"
    | "default"
    | "error"
    | "success"
    | "info"
    | "warning";
}

export const caseTypes: CaseType[] = [
  { label: "Đất đai", color: "primary" },
  { label: "Hôn nhân", color: "secondary" },
];
