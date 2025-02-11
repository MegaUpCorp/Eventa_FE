import FloatingMenu from '@tiptap/extension-floating-menu'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import TiptapMenu from './TipTapMenu'
import { EditorContent, useEditor } from '@tiptap/react'

// NOTE: the Image extension only support uploading images via URL, if you want to upload to your server use FileHandler
// https://tiptap.dev/docs/editor/extensions/functionality/filehandler

const extensions = [
  StarterKit,
  Underline,
  Link.configure({ openOnClick: true, autolink: true, defaultProtocol: 'https' }),
  Placeholder.configure({ placeholder: 'Start typing your content here...' }),
  Image,
  FloatingMenu.configure({})
]

interface RichTextEditorProps {
  // lsSectionName: string
  className?: string
  onChange: (event: any) => void
}

export default function Tiptap({ className, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions,
    onFocus: ({ editor }) => editor.commands.focus('end'),
    editorProps: {
      attributes: {
        class: 'w-full h-full p-4 border-none focus:ring-0 focus:outline-none',
        spellCheck: 'false'
      }
    },
    onUpdate: ({ editor }) => {
      setTimeout(() => {
        if (editor.getHTML() === '<p></p>') {
          // removeContent()
          onChange('')
        } else {
          // setContent({ [lsSectionName]: editor.getHTML() })
          onChange(editor.getHTML())
        }
      }, 5000)
    },
    onCreate({ editor }) {
      // editor.commands.setContent(content[lsSectionName] || '')
    }
  })

  if (!editor) return null

  return (
    <>
      <TiptapMenu editor={editor} type='bubble' />
      <EditorContent editor={editor} autoFocus className={className} />
    </>
  )
}
