export interface IVdom {
  type: string;
  props: {
    dataId?: number;
  };
  children: Object[];
}