// Example
async function fetchUsers(id) {
  const users = await new Promise(res => res(['Juan', 'Oscar', 'Pedro']))
  return users
}

// Transpiled code by Babel

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg)
    var value = info.value
  } catch (error) {
    reject(error)
    return
  }
  if (info.done) {
    resolve(value)
  } else {
    Promise.resolve(value).then(_next, _throw)
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args)

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value)
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err)
      }

      _next(undefined)
    })
  }
}

function fetchUsers(_x) {
  return _fetchUsers.apply(this, arguments)
}

function _fetchUsers() {
  _fetchUsers = _asyncToGenerator(function* (id) {
    const users = yield new Promise(res => res(["Juan", "Oscar", "Pedro"]))
    return users
  })
  return _fetchUsers.apply(this, arguments)
}
