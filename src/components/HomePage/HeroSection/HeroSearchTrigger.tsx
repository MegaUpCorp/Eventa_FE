import { ChevronDown } from 'lucide-react'

interface HeroSearchTriggerProps {
  label: string
  value: string
}

export const HeroSearchTrigger = ({ label, value }: HeroSearchTriggerProps) => {
  return (
    <div className='flex flex-col items-start'>
      <div className='flex items-center gap-1'>
        <p className='font-medium text-lg'>{label}</p>
        <ChevronDown className='text-primary' />
      </div>
      <p className='text-sm text-muted-foreground truncate text-ellipsis'>{value}</p>
    </div>
  )
}
