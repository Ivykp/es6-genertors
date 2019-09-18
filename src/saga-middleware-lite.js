// Effects
const put = action => ({
  method: "put",
  action
});

const call = (fn, ...args) => ({
  method: "call",
  func: fn.bind(null, ...args)
});

// Function helpers
const delay = ms => new Promise(res => setTimeout(res, ms));

const delayWithError = ms =>
  new Promise((res, rej) => setTimeout(() => rej(new Error("on purpose")), ms));

// Saga Helpers
function* sagaTest() {
  try {
    yield call(delay, 1000);
    yield put({ type: "+" });
    yield call(delayWithError, 3000);
    yield put({ type: "ADD", value: 5 });
  } catch (e) {
    yield put({ type: "ERROR", msg: e.toString() });
    yield put({ type: "-" });
  }
}

const sagaWatcher = { actionType: "SAGA_TEST", saga: sagaTest };

// Saga Middleware (lite version)
const createSagaMiddleware = watcher => store => next => action => {
  if (action.type === watcher.actionType) {
    const generator = watcher.saga();
    const iter = ({ value, error } = {}) => {
      const nextIteration = error
        ? generator.throw(error)
        : generator.next(value);
      if (nextIteration.done) {
        return;
      } else {
        const value = nextIteration.value;
        if (value.method === "put") {
          store.dispatch(value.action);
          iter();
        } else if (value.method === "call") {
          // We assume call only works for promises
          value
            .func()
            .then(value => iter({ value }))
            .catch(e => {
              iter({ error: e });
            });
        } else {
          iter();
        }
      }
    };
    iter();
  }
  return next(action);
};

// Test: https://codesandbox.io/s/redux-playground-rts82
