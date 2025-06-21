'use client'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })

const Page = () => {
  return (
    <div className='h-full w-full flex items-center justify-center absolute top-[8rem]'>
        <Scene />
    </div>
  )
}

export default Page