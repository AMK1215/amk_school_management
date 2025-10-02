import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect } from 'react';

interface CKEditorComponentProps {
    value: string;
    onChange: (data: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export default function CKEditorComponent({ 
    value, 
    onChange, 
    placeholder = "Enter your content here...",
    disabled = false,
    className = ""
}: CKEditorComponentProps) {
    // Load MathJax for math rendering
    useEffect(() => {
        if (typeof window !== 'undefined' && !window.MathJax) {
            const script = document.createElement('script');
            script.src = 'https://polyfill.io/v3/polyfill.min.js?features=es6';
            script.async = true;
            document.head.appendChild(script);

            const mathJaxScript = document.createElement('script');
            mathJaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
            mathJaxScript.async = true;
            document.head.appendChild(mathJaxScript);

            mathJaxScript.onload = () => {
                if (window.MathJax) {
                    window.MathJax = {
                        tex: {
                            inlineMath: [['$', '$'], ['\\(', '\\)']],
                            displayMath: [['$$', '$$'], ['\\[', '\\]']]
                        },
                        options: {
                            skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
                        }
                    };
                }
            };
        }
    }, []);

    const editorConfiguration = {
        placeholder,
        isReadOnly: disabled,
        toolbar: {
            items: [
                'heading', '|',
                'bold', 'italic', 'underline', '|',
                'bulletedList', 'numberedList', '|',
                'link', 'blockQuote', 'insertTable', '|',
                'undo', 'redo'
            ]
        }
    };

    return (
        <div className={`ckeditor-wrapper ${className}`}>
            <CKEditor
                editor={ClassicEditor}
                config={editorConfiguration}
                data={value}
                onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    );
}
