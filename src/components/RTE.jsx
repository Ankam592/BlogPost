import React from "react"
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from "react-hook-form";


export const RTE = ({ name, control, label, defaultValue = "" }) => {
    const apikey = import.meta.env.API_KEY
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}
            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                    apiKey={import.meta.env.VITE_API_KEY}
                        initialValue="Hello guys, Lets Do React Project???"
                        init={{
                            branding: false,
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist',        // Advanced lists
                                'autolink',       // Auto create links
                                'lists',          // Ordered & unordered lists
                                'link',           // Add/edit links
                                'image',          // Insert and edit images
                                'charmap',        // Special characters
                                'preview',        // Preview HTML
                                'anchor',         // Anchor tags
                                'searchreplace',  // Search and replace
                                'visualblocks',   // Show block elements
                                'code',           // Source code view
                                'fullscreen',     // Fullscreen mode
                                'insertdatetime', // Insert date/time
                                'media',          // Embed audio/video
                                'table',          // Tables
                                'help',           // Help dialog
                                'wordcount'       // Word count
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic underline | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | link image media table | \
                                code preview fullscreen | help'                        }
                        }
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

