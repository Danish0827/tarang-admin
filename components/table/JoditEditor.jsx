"use client"

import { useRef, useState } from "react"
import JoditEditor from "jodit-react"

export default function MyEditor() {
  const editor = useRef(null)
  const [content, setContent] = useState("")

  const config = {
    readonly: false,
    height: 400,
    toolbarSticky: false,
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "brush",
      "|",
      "align",
      "|",
      "image",
      "link",
      "|",
      "undo",
      "redo",
      "|",
      "source"
    ]
  }

  return (
    <div className="border rounded-lg shadow-md">
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={newContent => setContent(newContent)}
      />
    </div>
  )
}
