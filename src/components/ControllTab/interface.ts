export interface IControlTabProps {
}

// export interface ISubMenuWrapperProps {
//   onClick: Function;
//   key: string;
//   title: string;
//   params: IClickParams;
// }

export interface IClickParams {
  state?: string;
  pathname: string;
  query?: string;
}