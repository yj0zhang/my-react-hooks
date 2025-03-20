import {
    root,
    useState
} from './React'
const {
    useEffect
} = React;
/**
 * react是一个 view library
 * state <=> view
 * 状态变化导致视图更新
 */
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
    const count2Decreasement = () => {
        setCount2(count2 - 1)
    };

    // useEffect(() => {
    //     setInterval(() => {
    //         console.log(count)
    //     },2000)
    // }, [])
    
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={countIncreasement}>+</button>
            <button onClick={countDecreasement}>-</button>


            <h1>{count2}</h1>
            <button onClick={count2Increasement}>+</button>
            <button onClick={count2Decreasement}>-</button>
        </div>
    )
}

root.render(<App />)

export default App;