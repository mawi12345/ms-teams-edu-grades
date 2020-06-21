import { READ_CSV } from '../actions/home';

const initState = {
  raw: []
};

export default function home(state = initState, action: any) {
  switch (action.type) {
    case READ_CSV:
      return {
        ...state,
        raw: action.data
      };
    default:
      return state;
  }
}
