import Image from 'next/image'
import { Inter } from 'next/font/google'
import heroImage from "../../public/png_1.png"
import HeroSvg from '@/assets/svg/HeroSvg'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
<div>
  <Navbar />
  <Hero/>
</div>

  )
}


