import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    const editorConfiguration = {
        placeholder,
        isReadOnly: disabled
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
