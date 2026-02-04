export type ResponseReport = {
  StartDate: string;
  EndDate: string;
  boxes: BoxesReport[];
};

export type BoxesReport = {
  name: string;
  products: string[];
};
