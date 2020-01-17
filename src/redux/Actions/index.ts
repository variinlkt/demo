interface IParams {
  title: string;
  action: {
    title: string;
    url: string;
  }
}
export const ChangeHeaderAction = (param: IParams) => ({
  type: 'change_header',
  path: '/',
  param
})