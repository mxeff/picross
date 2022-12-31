import type { Picross } from '@/interfaces/Picross';

const example = {
    cells: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    clues: {
        columns: [[0], [9], [9], [2, 2], [2, 2], [4], [4], [0]],
        rows: [[0], [4], [6], [2, 2], [2, 2], [6], [4], [2], [2], [2], [0]],
    },
} satisfies Picross;

export default example;
