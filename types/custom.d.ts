declare namespace JSX {
    interface IntrinsicElements {
        xml: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        category: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { name: string; colour: string; custom?: string }, HTMLElement>;
        block: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { type: string }, HTMLElement>;
    }
}
