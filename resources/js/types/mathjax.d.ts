declare global {
    interface Window {
        MathJax?: {
            tex: {
                inlineMath: string[][];
                displayMath: string[][];
            };
            options: {
                skipHtmlTags: string[];
            };
            typesetPromise: () => Promise<void>;
        };
    }
}

export {};
