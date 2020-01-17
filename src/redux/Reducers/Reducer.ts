interface IActionParams {
  type: string;
  [key: string]: any;
}
export default function counterReducer(state = initialState, action: IActionParams) {
  switch (action.type) {
      case 'change_header': 
        return { ...state, 
          header: {
            [action.path]: action.param
          }
        };
      default: 
        return state;
  }
}

const initialState = {
  header: {
    '/': {
      title: 'all',
      action: {
        title: 'add',
        url: '/'
      }
    },
    '/addSong': {
      title: '添加歌曲'
    }
  }
}