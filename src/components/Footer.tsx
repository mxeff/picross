import { css } from '@linaria/core';
import { version } from '../../package.json';

const footerCss = css`
    align-self: center;
    justify-self: center;
    font-size: 1.4rem;
    line-height: 1;
    padding: 1rem 0;
`;

const Footer = () => {
    return <footer class={footerCss}>v{version}</footer>;
};

export default Footer;
