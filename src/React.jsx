import PureComponent from './PureComponent';
const { createRoot } = ReactDOM;
export const root = createRoot(document.getElementById('app'));

// useState使用到的全局变量
const states = [];//保存上次渲染时的状态
const stateSetters = [];//保存修改状态的方法
let stateIndex = 0;
//useEffect使用到的全局变量
const effectDepArr = [];//保存上次渲染时的依赖(dep)
let effectIndex = 0;

const memoArr = [];
const callbackArr = [];
let memoIndex = 0;
let callbackIndex = 0;

function createState(initialState, stateIndex) {
    return states[stateIndex] ? states[stateIndex] : initialState;
}
function createStateSetter(stateIndex) {
    return (newState) => {
        if (typeof newState === 'function') {
            states[stateIndex] = newState(states[stateIndex])
        } else {
            states[stateIndex] = newState
        }
        render();
    }
}
export function useState(initialState) {
    states[stateIndex] = createState(initialState, stateIndex);
    if (!stateSetters[stateIndex]) {
        stateSetters.push(createStateSetter(stateIndex));
    }
    const _state = states[stateIndex];
    const _setState = stateSetters[stateIndex]
    stateIndex++;
    return [
        _state,
        _setState
    ]
}

export function useReducer(reducer, initialState) {
    const [state, setState] = useState(initialState);
    function dispatch({ type, payload }) {
        const newState = reducer(state, { type, payload });
        setState(newState);
    }
    return [state, dispatch]
}

export function useEffect(cb, depArr) {
    if (typeof cb !== 'function') {
        throw new TypeError('Callback must be a function')
    }
    if (depArr !== undefined && !Array.isArray(depArr)) {
        throw new TypeError('Dependencies must be an Array')
    }
    const isChanged = effectDepArr[effectIndex]
        ? depArr.some((dep, index) => dep !== effectDepArr[effectIndex][index])
        : true;
    if (isChanged || depArr === undefined) {
        cb();
    }
    effectDepArr[effectIndex] = depArr;
    effectIndex++;
}

export function memo(Fc) {
    return class extends PureComponent {
        render() {
            return Fc(this.props)
        }
    }
}

export function useMemo(cb, depArr) {
    if (memoArr[memoIndex]) {
        const [_memo, _depArr] = memoArr[memoIndex];
        const isFullySame = depArr.every((dep, index) => dep === _depArr[index]);
        if (isFullySame) {
            memoIndex++;
            return _memo
        } else {
            return setNewMemo(cb, depArr);
        }
    } else {
        return setNewMemo(cb, depArr);
    }
    function setNewMemo(cb, depArr) {
        const memo = cb();
        memoArr[memoIndex ++] = [memo, depArr];
        return memo;
    }
}
export function useCallback(cb, depArr) {
    if (callbackArr[callbackIndex]) {
        const [_cb, _depArr] = callbackArr[callbackIndex];
        const isFullySame = depArr.every((dep, index) => dep === _depArr[index]);
        if (isFullySame) {
            callbackIndex++;
            return _cb;
        } else {
            return setNewCallback(cb, depArr)
        }
    } else {
        return setNewCallback(cb, depArr)
    }
    function setNewCallback(cb, depArr) {
        callbackArr[callbackIndex++] = [cb, depArr];
        return cb
    }
}
async function render() {
    const App = (await import('./App2')).default;
    stateIndex = 0;
    effectIndex = 0;
    memoIndex = 0;
    callbackIndex = 0;
    root.render(<App/>)
}
