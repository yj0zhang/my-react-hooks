// const { createRoot } = ReactDOM;
// const root = createRoot(document.getElementById('app'));
const {
    useMemo,
} = React;
import {
    root,
    useState,
    memo
} from './React'

const Child = memo((props) => {
    console.log('child is recalled')
    return (
        <div>
            <h1>count2: {props.childData.count2}</h1>
    </div>
    )
})

function App() {
    const [count, setCount] = useState(0);
    const countIncreasement = () => {
        setCount(count + 1)
    };
    const countDecreasement = () => {
        setCount(count - 1)
    };

    const [count2, setCount2] = useState(0);
    const count2Increasement = () => {
        setCount2(count2 + 1)
    };
    const childData = useMemo(() => ({
        count2
    }), [count2])
    // const count2Decreasement = () => {
    //     setCount2(count2 - 1)
    // };

    return (
        <div>
            <h1>count1: { count}</h1>
            <button onClick={countIncreasement}>+</button>
            <button onClick={countDecreasement}>-</button>


            <Child childData={childData} />
            <button onClick={count2Increasement}>+</button>
        </div>
    )
}
root.render(<App />);

export default App;