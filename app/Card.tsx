import {motion} from 'motion/react'
import { GithubIcon } from './Github'
import Link from 'next/link'

const Card = () => {
  return (
    <motion.div className='h-96 w-72 flex flex-col items-center justify-center gap-4 border border-gray-200/50 bg-white/20 backdrop-blur-3xl rounded-xl p-10 font-mono text-center'>
        <div>Follow me on Github</div>
        <Link href='https://github.com/7sumona02' className='bg-neutral-900 p-3 rounded-full'><GithubIcon /></Link>
    </motion.div>
  )
}

export default Card