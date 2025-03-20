// const { createRoot } = ReactDOM;
// const root = createRoot(document.getElementById('app'));
// const {
//     useMemo,
//     useCallback,
// } = React;
import {
    root,
    useState,
    memo,
    useMemo,
    useCallback,
} from './React'

const Child = memo((props) => {
    console.log('child is recalled')
    return (
        <div>
            <h1>count2: {props.childData.count2}</h1>
            <button onClick={props.setCount2}>+</button>
    </div>
    )
})

function App() {
    const [count, setCount] = useState(0);
    const countIncreasement = () => {
        setCount(count + 1)
    };
    const [count2, setCount2] = useState(0);
    const childData = useMemo(() => ({
        count2
    }), [count2])
    // const cbSetCount2 = useCallback(() => {
    //     // 用函数避免闭包陷阱
    //     setCount2(count2 => count2 + 1)
    // }, []);
    const cbSetCount2 = useCallback(() => {
        setCount2(count2 + 1)
    }, []);

    return (
        <div>
            <h1>count1: { count}</h1>
            <button onClick={countIncreasement}>+</button>
            {/* <button onClick={countDecreasement}>-</button> */}


            <Child childData={childData} setCount2={ cbSetCount2 } />
            {/* <button onClick={count2Increasement}>+</button> */}
        </div>
    )
}
root.render(<App />);

export default App;