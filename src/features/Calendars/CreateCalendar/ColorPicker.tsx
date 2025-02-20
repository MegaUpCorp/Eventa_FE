import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import * as React from 'react'

import { cn } from 'src/lib/utils'

const colors: Record<string, string> = {
  '#d4d4d4': 'focus:ring-[#d4d4d4]',
  '#ff9ed2': 'focus:ring-[#ff9ed2]',
  '#c193ff': 'focus:ring-[#c193ff]',
  '#89a5ff': 'focus:ring-[#89a5ff]',
  '#6ec3ff': 'focus:ring-[#6ec3ff]',
  '#71e676': 'focus:ring-[#71e676]',
  '#ffd873': 'focus:ring-[#ffd873]',
  '#ff8a80': 'focus:ring-[#ff8a80]',
  '#ff66cc': 'focus:ring-[#ff66cc]',
  '#a855f7': 'focus:ring-[#a855f7]'
}

const ColorPicker = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('flex gap-2', className)} {...props} ref={ref} />
})
ColorPicker.displayName = RadioGroupPrimitive.Root.displayName

const ColorPickerItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  { color: string } & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, color, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'h-8 w-8 rounded-full border-2 border-transparent focus:outline-none focus:ring-2',
        'data-[state=checked]:border-black dark:data-[state=checked]:border-white relative',
        colors[color],
        className
      )}
      style={{ backgroundColor: color }}
      {...props}
    ></RadioGroupPrimitive.Item>
  )
})

ColorPickerItem.displayName = RadioGroupPrimitive.Item.displayName

export { ColorPicker, ColorPickerItem, colors }
