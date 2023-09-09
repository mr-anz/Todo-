import React, { useEffect } from 'react'
import {useStateContext} from '../context/index'

const Navbar = () => {
  const {connectWallet, address, getTodo} = useStateContext()

  useEffect(() => {
    const fetch = async() => {
      getTodo()
    }
    fetch()
   
  }, [address])

  return (
    <div className="navbar glass bg-[#93ff00] justify-between shadow-white shadow-md">
      <p className="btn btn-ghost normal-case  text-xl">Timeless</p>
      {address ?
        ( <button className="btn bg-white opacity-70 glass" >{address.slice(0,4) + '....' + address.slice(38)}</button> ):
        ( <button className="btn  bg-white opacity-70 glass" onClick={connectWallet}>Connect Wallet</button>)
      }
    </div>
  )
}

export default Navbar