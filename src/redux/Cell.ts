export type CellTypes = "code" | "text";

export type FileTypes = "js" | "css";

export type Direction = "up" | "down";

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
  fileName?: string;
  fileType?: FileTypes;
}
