import { Editor } from '@tiptap/core'
import { BubbleMenu as TiptapBubbleMenu, FloatingMenu as TiptapFloatingMenu } from '@tiptap/react'
import { Bold, Heading1, Heading2, Italic } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Separator } from '../ui/separator'

interface BubbleMenuProps {
  editor: Editor | null
  type: 'floating' | 'bubble' | 'menu'
}

export interface EditorMenu {
  name: string
  icon: React.ReactNode
  onClick?: () => void
  isActive: boolean
  showDivider?: boolean
}

export default function TiptapMenu({ editor, type }: BubbleMenuProps) {
  if (!editor) return null

  const EDITOR_MENU: EditorMenu[] = [
    {
      name: 'heading-1',
      icon: <Heading1 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 })
    },
    {
      name: 'heading-2',
      icon: <Heading2 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 })
    },
    {
      name: 'bold',
      icon: <Bold />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold')
    },
    {
      name: 'italic',
      icon: <Italic />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic')
    }
    // {
    //   name: 'underline',
    //   icon: <Underline className='w-5 h-5' />,
    //   onClick: () => editor.chain().focus().toggleUnderline().run(),
    //   isActive: editor.isActive('underline'),
    //   showDivider: true
    // },
    // {
    //   name: 'bulletList',
    //   icon: <List className='w-5 h-5' />,
    //   onClick: () => editor.chain().focus().toggleBulletList().run(),
    //   isActive: editor.isActive('bulletList')
    // },
    // {
    //   name: 'orderedList',
    //   icon: <ListOrdered className='w-5 h-5' />,
    //   onClick: () => editor.chain().focus().toggleOrderedList().run(),
    //   isActive: editor.isActive('orderedList'),
    //   showDivider: true
    // }
  ]

  const content = (
    <Card className='p-1.5'>
      <div className='flex items-center gap-1'>
        {EDITOR_MENU.map((item) => (
          <div key={item.name} className='flex items-center gap-1'>
            <Button
              onClick={item.onClick ? item.onClick : undefined}
              className={item.isActive ? 'text-chart-3' : 'bg-transparent text-muted-foreground'}
              size='icon'
              variant='ghost'
            >
              {item.icon}
            </Button>
            {item.showDivider && <Separator orientation='vertical' className='h-8' />}
          </div>
        ))}
      </div>
    </Card>
  )

  return (
    <div id='parent' className='w-full'>
      {type === 'bubble' ? (
        <TiptapBubbleMenu tippyOptions={{ appendTo: 'parent' }} editor={editor}>
          {content}
        </TiptapBubbleMenu>
      ) : type === 'floating' ? (
        <TiptapFloatingMenu tippyOptions={{ appendTo: 'parent' }} editor={editor}>
          {content}
        </TiptapFloatingMenu>
      ) : (
        <div className='flex items-center justify-between w-full'>
          <div className='p-1.5 flex items-center gap-2'>
            {EDITOR_MENU.slice(0, 5).map((item) => (
              <Button
                key={item.name}
                onClick={item.onClick ? item.onClick : undefined}
                className={item.isActive ? 'bg-primary-100 text-primary' : 'bg-transparent text-zinc-500'}
                size='icon'
              >
                {item.icon}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
