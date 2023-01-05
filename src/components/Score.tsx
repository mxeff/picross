import { State } from './Cell';
import { useStore } from '@/store';

const Score = () => {
    const { cluesCount, errorCount, fieldCountByState } = useStore();

    return (
        <dl>
            <dt>Errors</dt>
            <dd>{errorCount}</dd>
            <dt>Left</dt>
            <dd>{cluesCount - fieldCountByState[State.FILLED]}</dd>
        </dl>
    );
};

export default Score;
