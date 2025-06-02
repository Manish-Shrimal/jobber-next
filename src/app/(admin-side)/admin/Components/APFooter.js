import React from 'react'
// import { Link } from 'react-router-dom'
import Link from "next/link";
import Image from 'next/image';


const APFooter = () => {
  return (
    <div className="APFooter">
      <p>Designed and Developed by <span><Link href="https://www.logicspice.com/" target='_blank'><Image width={100} height={100} src="/Images/LS-logo.png" className='footerLogo' alt="" /></Link></span></p>
    </div>
  )
}

export default APFooter
