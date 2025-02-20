import { useDynamicWidth } from 'src/hooks/useDynamicWidth'

const Footer = () => {
  const width = useDynamicWidth()

  return (
    <div className='mx-auto mt-16 p-4' style={{ width }}>
      <div className='border border-solid w-full h-[0.2px]' />
      <div className='my-4 flex items-center'>
        <div className='flex justify-start w-1/2'>
          <p className='mr-4'>English</p>
          <p>Vietnamese</p>
        </div>
        <div className='flex justify-end w-1/2'>
          <p>Non Copyrighted © 2024 Upload by MegaUp</p>
        </div>
      </div>
    </div>
  )
}
export default Footer
