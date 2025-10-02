import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Bold, Italic, Underline, Strikethrough } from '@ckeditor/ckeditor5-basic-styles';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { List } from '@ckeditor/ckeditor5-list';
import { Link } from '@ckeditor/ckeditor5-link';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload } from '@ckeditor/ckeditor5-image';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Font } from '@ckeditor/ckeditor5-font';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import { type ChangeEvent } from 'react';

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
        plugins: [
            Essentials,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Paragraph,
            Heading,
            List,
            Link,
            BlockQuote,
            Table,
            TableToolbar,
            MediaEmbed,
            Image,
            ImageCaption,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            Alignment,
            Font,
            Highlight,
            HorizontalLine,
            Indent,
            TextTransformation,
            SourceEditing
        ],
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                '|',
                'fontSize',
                'fontFamily',
                'fontColor',
                'fontBackgroundColor',
                '|',
                'alignment',
                '|',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'link',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                '|',
                'highlight',
                'horizontalLine',
                '|',
                'sourceEditing',
                '|',
                'undo',
                'redo'
            ]
        },
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
            ]
        },
        fontSize: {
            options: [
                9, 11, 13, 'default', 17, 19, 21
            ],
            supportAllValues: true
        },
        fontFamily: {
            supportAllValues: true
        },
        fontColor: {
            colors: [
                { color: 'hsl(0, 0%, 0%)', label: 'Black' },
                { color: 'hsl(0, 0%, 30%)', label: 'Dim grey' },
                { color: 'hsl(0, 0%, 60%)', label: 'Grey' },
                { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
                { color: 'hsl(0, 0%, 100%)', label: 'White', hasBorder: true },
                { color: 'hsl(0, 75%, 60%)', label: 'Red' },
                { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
                { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
                { color: 'hsl(90, 75%, 60%)', label: 'Light green' },
                { color: 'hsl(120, 75%, 60%)', label: 'Green' },
                { color: 'hsl(150, 75%, 60%)', label: 'Aquamarine' },
                { color: 'hsl(180, 75%, 60%)', label: 'Turquoise' },
                { color: 'hsl(210, 75%, 60%)', label: 'Light blue' },
                { color: 'hsl(240, 75%, 60%)', label: 'Blue' },
                { color: 'hsl(270, 75%, 60%)', label: 'Purple' }
            ]
        },
        fontBackgroundColor: {
            colors: [
                { color: 'hsl(0, 75%, 60%)', label: 'Red' },
                { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
                { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
                { color: 'hsl(90, 75%, 60%)', label: 'Light green' },
                { color: 'hsl(120, 75%, 60%)', label: 'Green' },
                { color: 'hsl(150, 75%, 60%)', label: 'Aquamarine' },
                { color: 'hsl(180, 75%, 60%)', label: 'Turquoise' },
                { color: 'hsl(210, 75%, 60%)', label: 'Light blue' },
                { color: 'hsl(240, 75%, 60%)', label: 'Blue' },
                { color: 'hsl(270, 75%, 60%)', label: 'Purple' },
                { color: 'hsl(0, 0%, 0%)', label: 'Black' },
                { color: 'hsl(0, 0%, 30%)', label: 'Dim grey' },
                { color: 'hsl(0, 0%, 60%)', label: 'Grey' },
                { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
                { color: 'hsl(0, 0%, 100%)', label: 'White', hasBorder: true }
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
            ]
        },
        image: {
            toolbar: [
                'imageTextAlternative',
                'toggleImageCaption',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side'
            ]
        },
        link: {
            decorators: {
                addTargetToExternalLinks: true,
                defaultProtocol: 'https://',
                toggleDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'file'
                    }
                }
            }
        },
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
