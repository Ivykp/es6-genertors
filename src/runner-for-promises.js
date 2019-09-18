const { fetchUsers, isValidName } = require('./util/users')

function *userHasValidName(id) {
  try {
    // const users = yield fetchUsers();
    const users = yield new Promise((res, rej) => rej(new Error('On purpose')));
    const userName = users.find(user => user.id === id).name
    return isValidName(userName)
  } catch (e) {
    console.log('Error catched on try/catch', e.toString());
    throw e; // Re-throw the exception, we could also return a value as result here.
  }

}

const runner = generatorFn => (...args) => {
  const gen = generatorFn(...args);

  const iter = ({ value, error } = {}) => {
    const next = error ? gen.throw(error) : gen.next(value);
    const { value: currentValue, done } = next;
    if (done) {
      return currentValue;
    } else {
      return currentValue.then(v => iter({ value: v })).catch(e => iter({ error: e }))
    }
  }

  return iter();
}

runner(userHasValidName)(1)
  .then(r => console.log('Name validation result: ', r))
  .catch(err => console.error('An error ocurred', err.toString()));
