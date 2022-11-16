import { GetStaticProps } from 'next/types'

export default function Home() {
  return (
    <div className='h-screen w-screen bg-[#2D2D2D] text-white'>
      Hi
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: 'Hello World',
    },
  }
}
