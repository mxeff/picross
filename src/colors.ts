type Color = `#${Uppercase<string>}`;

const colors = {
    black: '#000000',
    white: '#FFFFFF',
} satisfies Record<string, Color>;

export default colors;
