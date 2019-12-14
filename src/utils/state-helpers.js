export function updateStateByKey(key, value, callback) {
  callback(prevState => {
    let newState = { ...prevState };
    newState[key] = value;
    return newState;
  });
}
