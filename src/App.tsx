import { useState } from 'react'
import logo from './assets/logo.png'
import './output.css'

function DirectMessages () {
  return <div className='directMessage flex flex-row items-center gap-2 relative'>
    <div className='h-[40px] w-[4px] bg-white rounded-r-[4px] fixed left-0'></div>
    <img className='rounded-[13px] w-[48px]' src={logo} alt="lol" />
  </div>
}

function Server({name})
{
  const [isHoverd, setIsHoverd] = useState(false)

  return <div className='server flex flex-row items-center gap-2 relative'>
    <div className={` w-[4px] bg-white rounded-r-[4px] ${isHoverd ? 'h-[40px]' : 'h-[8px]'} fixed left-0 ease-in-out duration-300`}></div>
    <img onMouseEnter={() => setIsHoverd(true)} onMouseLeave={() => setIsHoverd(false)} id={name} className={`w-[48px] ${isHoverd ? 'rounded-[13px]' : 'rounded-[50%]'} ease-in-out duration-300`} src={logo} alt="name" />
  </div>
}

const LineSeparator = () => {
  return (
    <div
      style={{
        height: '2px',
        width: '32px',
        backgroundColor: '#2D2F32',
        borderRadius: '1px',
        // margin: '-10px 0px'
      }}
    />
  );
};

function App() {
  return <nav className='flex flex-col items-center gap-3 pt-4 h-screen w-[70px] bg-[#202225]'>
    <DirectMessages />
    <LineSeparator />
    <Server name={"Freda"}/>
    <Server name={"Freda"}/>
    <Server name={"Freda"}/>
    <Server name={"Freda"}/>
    <Server name={"Freda"}/>
    <Server name={"Freda"}/>
    <Server name={"Freda"}/>
    <Server name={"Freda"}/>
    <Server name={"Freda"}/>
    <Server name={"Freda"}/>

  </nav>

}

export default App

