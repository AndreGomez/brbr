import en from '../locale/en';

const regex = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  url: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
};

export const validateFields = async (state = {}) => {
  let errorMessage = '';

  for (var key in state) {
    const _state = state[key];
    const _regex = regex[_state.type];

    if (_state.required) {
      if (_state.value === '' || _state.value === null) {
        errorMessage = `required_${key}`
        break;
      } else if (_regex) {
        if (!_regex.test(_state.value)) {
          errorMessage = `invalid_${key}`
          break;
        }
      } else if (_state.type === 'confirmPassword') {
        if (_state.value !== state['password'].value) {
          errorMessage = `pass_${key}`
          break;
        }
      }
    }
  }

  if (errorMessage !== '') {
    return new Promise.reject(errorMessage);
  }

  return new Promise.resolve(true);
};


export const isUrl = (url) => {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

  return regexp.test(url);
}
