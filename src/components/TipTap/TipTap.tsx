import FloatingMenu from '@tiptap/extension-floating-menu'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import TiptapMenu from './TipTapMenu'
import FileHandler from '@tiptap-pro/extension-file-handler'
import Youtube from '@tiptap/extension-youtube'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Blockquote from '@tiptap/extension-blockquote'
import { EditorContent, useEditor } from '@tiptap/react'
import { useUpload } from 'src/config/appwrite/useUpload'
import { useLocalStorage } from 'src/hooks/useLocalStorage'
import { appwriteStorage } from 'src/config/appwrite/appwrite'

// NOTE: the Image extension only support uploading images via URL, if you want to upload to your server use FileHandler
// https://tiptap.dev/docs/editor/extensions/functionality/filehandler

interface RichTextEditorProps {
  lsSectionName: string
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (event: any) => void
}

export default function Tiptap({ className, onChange, lsSectionName }: RichTextEditorProps) {
  const [content, setContent, removeContent] = useLocalStorage(lsSectionName, '')

  const editor = useEditor({
    extensions: [
      StarterKit,
      HorizontalRule,
      Blockquote,
      Underline,
      Youtube.configure({
        controls: false,
        nocookie: true
      }),
      Link.configure({ openOnClick: true, autolink: true, defaultProtocol: 'https' }),
      Placeholder.configure({ placeholder: 'Start typing your content here...' }),
      Image,
      FloatingMenu.configure({}),
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            mutateAsync(file).then((response) => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: 'image',
                  attrs: {
                    src: appwriteStorage.getFilePreview(import.meta.env.VITE_APPWRITE_IMAGES_STORAGE_ID, response.$id)
                  }
                })
                .focus()
                .run()
            })
          })
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) {
              return false
            }

            mutateAsync(file).then((response) => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: 'image',
                  attrs: {
                    src: appwriteStorage.getFilePreview(import.meta.env.VITE_APPWRITE_IMAGES_STORAGE_ID, response.$id)
                  }
                })
                .focus()
                .run()
            })
          })
        }
      })
    ],
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
          removeContent()
          onChange('')
        } else {
          setContent(editor.getHTML())
          onChange(editor.getHTML())
        }
      }, 5000)
    },
    onCreate({ editor }) {
      editor.commands.setContent(content || '')
    }
  })

  if (!editor) return null

  const { mutateAsync } = useUpload()

  return (
    <>
      <TiptapMenu editor={editor} type='floating' />
      <TiptapMenu editor={editor} type='bubble' />
      <EditorContent editor={editor} autoFocus className={className} />
    </>
  )
}
