interface IActionParams {
  type: string;
}
export default function counterReducer(state = initialState, action: IActionParams) {
  switch (action.type) {
      case 'counter_add': 
        return { ...state, ...{
          count: state.count + 1  //计数器加一
        }};
      default: 
        return state;
  }
}

const initialState = {
  count: 0,  //count初始值
}