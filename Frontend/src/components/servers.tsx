import { useState } from 'react'
import { useContext } from 'react'
import { NavbarContext } from '../contexts/navbarContext'
import '../output.css'
import logo from '../assets/logo.png'

function Server({name}: {name: string})
{
  const context = useContext(NavbarContext);
  const isClicked = context.clickedIcon === name;
  const [isHoverd, setIsHoverd] = useState(false)

  return <div className='server flex flex-row items-center gap-2 relative'>
    <div className={`${(isClicked || isHoverd) ? 'h-[40px]' : 'h-[8px]'} w-[4px] bg-white rounded-r-[4px] fixed left-0 ease-in-out duration-300`}></div>
    <img onClick={() => context.setClickedIcon(name)} onMouseEnter={() => setIsHoverd(true)} onMouseLeave={() => setIsHoverd(false)} id={name} className={`cursor-pointer w-[48px] ${isClicked || isHoverd ? 'rounded-[13px]' : 'rounded-[50%]'} ease-in-out duration-300`} src={logo} alt="name" />
  </div>
}

function AddServer({name}: {name: string}) {
  const context = useContext(NavbarContext);
  const isClicked = context.clickedIcon === name;
  const [isHoverd, setIsHoverd] = useState(false)

  return <div id={name} className='addServer flex flex-row items-center gap-2 relative'>
    <div className={`${(isClicked || isHoverd) ? 'h-[40px]' : 'h-[8px]'} h-[40px] w-[4px] bg-white rounded-r-[4px] fixed left-0 ease-in-out duration-300`}></div>
    <div style={isHoverd || isClicked ? {color: 'white'} : {color: '#3BA55D'}}  className={`w-[48px] h-[48px] ${isHoverd || isClicked ? 'rounded-[13px] bg-[#3BA55D]' : 'rounded-[50%] bg-[#36393F]'} flex items-center justify-center bg-[#36393F] ease-in-out duration-300 cursor-pointer`}>
      <svg onClick={() => context.setClickedIcon(name)} onMouseEnter={() => setIsHoverd(true)} onMouseLeave={() => setIsHoverd(false)} className="circleIcon__428dd " aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M13 5a1 1 0 1 0-2 0v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5Z" ></path></svg>
    </div>
  </div>
}

function DiscoverServers({name}: {name: string}) {
  const context = useContext(NavbarContext);
  const isClicked = context.clickedIcon === name;
  const [isHoverd, setIsHoverd] = useState(false)

  return <div id={name} className='addServer flex flex-row items-center gap-2 relative'>
    <div className={`${(isClicked || isHoverd) ? 'h-[40px]' : 'h-[8px]'} h-[40px] w-[4px] bg-white rounded-r-[4px] fixed left-0 ease-in-out duration-300 `}></div>
    <div style={isHoverd || isClicked ? {color: 'white'} : {color: '#3BA55D'}}  className={`w-[48px] h-[48px] ${isHoverd || isClicked ? 'rounded-[13px] bg-[#3BA55D]' : 'rounded-[50%] bg-[#36393F]'} flex items-center justify-center bg-[#36393F] ease-in-out duration-300 cursor-pointer`}>
      <svg onClick={() => context.setClickedIcon(name)}onMouseEnter={() => setIsHoverd(true)} onMouseLeave={() => setIsHoverd(false)} className="circleIcon__428dd" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" class=""></path><path fill="currentColor" fill-rule="evenodd" d="M23 12a11 11 0 1 1-22 0 11 11 0 0 1 22 0ZM7.74 9.3A2 2 0 0 1 9.3 7.75l7.22-1.45a1 1 0 0 1 1.18 1.18l-1.45 7.22a2 2 0 0 1-1.57 1.57l-7.22 1.45a1 1 0 0 1-1.18-1.18L7.74 9.3Z" clip-rule="evenodd"></path></svg>
    </div>
  </div>
}

export { Server, AddServer, DiscoverServers }