import { actions } from "./home.actions";

const initialState = {
  data: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.loadUsers.REQUEST:
    case actions.loadUsers.SUCCESS:
    case actions.loadUsers.FAILURE:
      return {
        ...state,
        loading: action.type === actions.loadUsers.REQUEST,
        data:
          action.type === actions.loadUsers.SUCCESS
            ? action.payload.response.data.sort(
                (a, b) => new Date(a.birthDate) - new Date(b.birthDate)
              )
            : [],
      };
    case actions.saveUser.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.saveUser.SUCCESS:
      const newUser = action.payload.values;

      return {
        ...state,
        data: [...state.data, newUser],
        loading: false,
      };
    case actions.saveUser.FAILURE:
      return {
        ...state,
        loading: false,
      };

    case actions.deleteUser.SUCCESS:
      return {
        ...state,
        data: state.data.filter((user) => user.id !== action.payload.values.id),
      };
    default:
      return state;
  }
};

export default reducer;
