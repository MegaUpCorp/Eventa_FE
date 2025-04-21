import { Editor } from '@tiptap/core'
import { BubbleMenu as TiptapBubbleMenu, FloatingMenu as TiptapFloatingMenu } from '@tiptap/react'
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  LucideIcon,
  MonitorPlay,
  Quote,
  SquareSplitVertical
} from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Separator } from '../ui/separator'
import { cn } from 'src/lib/utils'

interface BubbleMenuProps {
  editor: Editor | null
  type: 'floating' | 'bubble' | 'menu'
  className?: string
}

export interface EditorMenu {
  name: string
  icon: LucideIcon
  onClick?: () => void
  isActive: boolean
  showDivider?: boolean
}

export default function TiptapMenu({ editor, type, className }: BubbleMenuProps) {
  if (!editor) return null

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 300,
        height: 300
      })
    }
  }

  const EDITOR_MENU: EditorMenu[] = [
    {
      name: 'heading-1',
      icon: Heading1,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 })
    },
    {
      name: 'heading-2',
      icon: Heading2,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 })
    },
    {
      name: 'bold',
      icon: Bold,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold')
    },
    {
      name: 'italic',
      icon: Italic,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic')
    },
    {
      name: 'blockquote',
      icon: Quote,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
      showDivider: true
    },
    {
      name: 'yt',
      icon: MonitorPlay,
      onClick: addYoutubeVideo,
      isActive: false
    },
    {
      name: 'divider',
      icon: SquareSplitVertical,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      isActive: false,
      showDivider: true
    },
    {
      name: 'bulletList',
      icon: List,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList')
    },
    {
      name: 'orderedList',
      icon: ListOrdered,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList')
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
      <div className='flex items-center gap-1 w-full'>
        {EDITOR_MENU.map((item) => (
          <div key={item.name} className='flex items-center gap-1'>
            <Button
              onClick={item.onClick ? item.onClick : undefined}
              className={item.isActive ? 'text-primary' : 'bg-transparent text-muted-foreground'}
              size='icon'
              variant='ghost'
            >
              <item.icon />
            </Button>
            {item.showDivider && <Separator orientation='vertical' className='h-8' />}
          </div>
        ))}
      </div>
    </Card>
  )

  return (
    <div className={cn(className, 'fixed z-50 h-8 w-[calc(820px-48px)]')}>
      {type === 'bubble' ? (
        <TiptapBubbleMenu tippyOptions={{ appendTo: 'parent' }} editor={editor}>
          {content}
        </TiptapBubbleMenu>
      ) : type === 'floating' ? (
        <TiptapFloatingMenu tippyOptions={{ appendTo: 'parent' }} editor={editor}>
          {content}
        </TiptapFloatingMenu>
      ) : (
        <div className='flex items-center glass rounded-lg p-1 gap-2 mb-4'>
          {EDITOR_MENU.map((item) => (
            <div key={item.name} className='flex items-center gap-2'>
              <Button
                onClick={item.onClick ? item.onClick : undefined}
                className={cn(
                  'cursor-pointer',
                  item.isActive ? 'bg-primary-100 text-primary' : 'bg-transparent text-white'
                )}
                size='icon'
                variant='ghost'
              >
                <item.icon />
              </Button>
              {item.showDivider && <Separator orientation='vertical' className='h-4' />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
