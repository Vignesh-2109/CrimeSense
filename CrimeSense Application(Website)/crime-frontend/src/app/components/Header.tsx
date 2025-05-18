import Box from '@mui/material/Box'
import Link from 'next/link'
import { Button } from './Button' 
import HeaderCSR from './HeaderComp'

const HeaderSSR = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white p-3">
      <Box className="mx-auto max-w-[1200px]">
        <nav className="relative flex items-center justify-between bg-white">
          <Link href="/" aria-label="Home">
            <p className='text-2xl font-semibold'>Crime Sense</p>
          </Link>

          {/* Desktop Navigation */}
          <Box className="items-center gap-8">
            <HeaderCSR />
          </Box>

          {/* Login/Signup
        //   <Box
        //     sx={{ display: { xs: 'none', md: 'flex' } }}
        //     className="items-center gap-5 "
        //   >
        //     <Link
        //       href="https://app.binocs.co/auth?src=login"
        //       className="text-Link text-base"
        //       target="_blank"
        //     >
        //       Login
        //     </Link>

        //     <Button color="primary" className="rounded! ">
        //       <Link
        //         className="text-base font-normal"
        //         target="_blank"
        //         href="https://calendly.com/shobit-gupta-binocs/shobit-binocs"
        //       >
        //         Schedule Demo
        //       </Link>
        //     </Button>
        //   </Box> */}
        </nav>
      </Box>
    </header>
  )
}

export default HeaderSSR
