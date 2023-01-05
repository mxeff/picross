import { useStore } from '@/store';

const Controls = () => {
    const { reset } = useStore();

    return <button onClick={reset}>Reset</button>;
};

export default Controls;
