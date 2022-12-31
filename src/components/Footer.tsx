import { styled } from '@linaria/react';
import { version } from '../../package.json';

const Wrapper = styled.footer`
    align-self: center;
    justify-self: center;
    font-size: 1.4rem;
    line-height: 1;
    padding: 1rem 0;
`;

const Footer = () => {
    return <Wrapper>v{version}</Wrapper>;
};

export default Footer;
