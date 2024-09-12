
const _ = (() => {
    return {
        filter : _curryr(_filter),
        map : _curryr(_map),
        each : _each,
        get : _curryr(_get),
        reduce : reduce,
        go : go,
        pipe : pipe,
    };
})();

function _filter(list, predi) {
    const result = [];

    _each(list, val => {
        if (predi(val)) {
            result.push(val);
        }
    });

    return result;
}

function _map(list, mapper) {
    const result = [];

    _each(list, val => {
        result.push(mapper(val));
    })

    return result;
}

function _each(list, fn) {
    for (let i = 0; i < list.length; i++) {
        fn(list[i]);
    }
}

function _curry(fn) {
    return function (a, b) {
        return arguments.length === 2 ? fn(a, b) : b => fn(a, b);
    }
}

function _curryr(fn) {
    return function (a, b) {
        return arguments.length === 2 ? fn(a, b) : b => fn(b, a);
    }
}

function _get(obj, key) {
    return obj == null ? undefined : obj[key];
}

function reduce(list, iter, memo) {
    if (arguments.length === 2) {
        memo = list[0];
        list = Array.prototype.slice.call(list, 1);
    }
    _.each(list, val => {
        memo = iter(memo, val);
    });

    return memo;
}

function pipe() {
    const fns = arguments;
    return function(val) {
        return _.reduce(fns, function(val, fn) {
            return fn(val);
        }, val);
    }
}

function go(val) {
    const fns = Array.prototype.slice.call(arguments, 1);
    return pipe.apply(null, fns)(val);
}