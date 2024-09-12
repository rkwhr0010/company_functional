
const _ = (() => {
    return {
        filter : _curryr(_filter),
        map : _curryr(_map),
        each : _each,
        get : _curryr(_get),
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