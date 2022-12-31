declare module '@linaria/react' {
    import type { styled } from '@linaria/react';
    import type { FunctionalComponent, JSX } from 'preact';

    declare type IntrinsicElements = keyof JSX.IntrinsicElements;

    declare type HtmlStyledTag<TName extends keyof IntrinsicElements> = <
        // eslint-disable-next-line @typescript-eslint/ban-types
        TAdditionalProps = {}
    >(
        strings: TemplateStringsArray,
        ...exprs: (
            | StaticPlaceholder
            | ((
                  props: IntrinsicElements[TName] &
                      Omit<TAdditionalProps, never>
              ) => string | number)
        )[]
    ) => FunctionalComponent<IntrinsicElements[TName] & TAdditionalProps>;

    declare type StyledJSXIntrinsics = {
        readonly [K in IntrinsicElements]: HtmlStyledTag<K>;
    };

    declare type Styled = StyledJSXIntrinsics;
    declare const styled: Styled;
}
