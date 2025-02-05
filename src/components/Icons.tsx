import { LucideProps } from 'lucide-react'

export const Icons = {
  google: (props: LucideProps) => (
    <svg width='128' height='128' viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#clip0_24_19)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M27.585 64C27.585 59.843 28.275 55.857 29.508 52.119L7.938 35.648C3.734 44.183 1.366 53.801 1.366 64C1.366 74.191 3.732 83.802 7.929 92.332L29.487 75.829C28.266 72.108 27.585 68.137 27.585 64Z'
          fill='#FBBC05'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M65.457 26.182C74.488 26.182 82.645 29.382 89.054 34.618L107.698 16C96.337 6.109 81.771 0 65.457 0C40.129 0 18.361 14.484 7.938 35.648L29.507 52.119C34.477 37.033 48.644 26.182 65.457 26.182Z'
          fill='#EA4335'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M65.457 101.818C48.645 101.818 34.478 90.967 29.508 75.881L7.938 92.349C18.361 113.516 40.129 128 65.457 128C81.089 128 96.014 122.449 107.215 112.049L86.741 96.221C80.964 99.86 73.689 101.818 65.457 101.818Z'
          fill='#34A853'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M126.634 64C126.634 60.218 126.051 56.145 125.177 52.364H65.457V77.091H99.833C98.114 85.522 93.436 92.003 86.741 96.221L107.215 112.049C118.981 101.129 126.634 84.861 126.634 64Z'
          fill='#4285F4'
        />
      </g>
      <defs>
        <clipPath id='clip0_24_19'>
          <rect width='128' height='128' fill='white' />
        </clipPath>
      </defs>
    </svg>
  ),
  github: (props: LucideProps) => (
    <svg width='98' height='96' viewBox='0 0 98 96' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#clip0_29_2)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M48.854 0C21.839 0 0 22 0 49.217C0 70.973 13.993 89.389 33.405 95.907C35.832 96.397 36.721 94.848 36.721 93.545C36.721 92.404 36.641 88.493 36.641 84.418C23.051 87.352 20.221 78.551 20.221 78.551C18.037 72.847 14.801 71.381 14.801 71.381C10.353 68.366 15.125 68.366 15.125 68.366C20.059 68.692 22.648 73.418 22.648 73.418C27.015 80.914 34.052 78.796 36.883 77.492C37.287 74.314 38.582 72.114 39.957 70.892C29.118 69.751 17.714 65.514 17.714 46.609C17.714 41.231 19.654 36.831 22.728 33.409C22.243 32.187 20.544 27.134 23.214 20.371C23.214 20.371 27.339 19.067 36.64 25.423C40.6221 24.3457 44.7288 23.7976 48.854 23.793C52.979 23.793 57.184 24.364 61.067 25.423C70.369 19.067 74.494 20.371 74.494 20.371C77.164 27.134 75.464 32.187 74.979 33.409C78.134 36.831 79.994 41.231 79.994 46.609C79.994 65.514 68.59 69.669 57.67 70.892C59.45 72.44 60.986 75.373 60.986 80.018C60.986 86.618 60.906 91.915 60.906 93.544C60.906 94.848 61.796 96.397 64.222 95.908C83.634 89.388 97.627 70.973 97.627 49.217C97.707 22 75.788 0 48.854 0Z'
          fill='white'
        />
      </g>
      <defs>
        <clipPath id='clip0_29_2'>
          <rect width='98' height='96' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
