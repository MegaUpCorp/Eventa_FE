import { Check } from 'lucide-react'
import { FieldValues, Path, useFormContext } from 'react-hook-form'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'src/components/ui/command'
import { FormControl, FormField, FormItem } from 'src/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { cn } from 'src/lib/utils'

interface HeroSectionComboboxProps<T> {
  data: { value: string; label: string }[]
  trigger: React.ReactNode
  name: Path<T>
  placeholder: string
}

export const Combobox = <T extends FieldValues>({ data, trigger, name, placeholder }: HeroSectionComboboxProps<T>) => {
  const { control } = useFormContext<T>()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Popover>
            <PopoverTrigger>
              <FormControl>{trigger}</FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder={placeholder} />
                <CommandList>
                  <CommandEmpty>No language found.</CommandEmpty>
                  <CommandGroup>
                    {data.map((item) => (
                      <CommandItem value={item.label} key={item.value} onSelect={() => field.onChange(item.value)}>
                        {item.label}
                        <Check className={cn('ml-auto', item.value === field.value ? 'opacity-100' : 'opacity-0')} />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}
