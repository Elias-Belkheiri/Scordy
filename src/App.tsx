import { Server, AddServer, DiscoverServers } from './components/servers'
import { NavbarContext } from './contexts/navbarContext'
import { useContext, useState } from 'react'
import logo from './assets/logo.png'
import './output.css'

function DirectMessages () {
  const [isHoverd, setIsHoverd] = useState(false)
  const context = useContext(NavbarContext);
  const isClicked = context.clickedIcon === "directMessage";
  return <div className='directMessage flex flex-row items-center gap-2 relative'>
    <div className={`${(isClicked || isHoverd) ? 'h-[40px]' : 'h-[8px]'} w-[4px] bg-white rounded-r-[4px] fixed left-0 ease-in-out duration-300`}></div>
    <img onClick={() => context.setClickedIcon("directMessage")} onMouseEnter={() => setIsHoverd(true)} onMouseLeave={() => setIsHoverd(false)} className={`cursor-pointer ${isClicked || isHoverd ? 'rounded-[13px]' : 'rounded-[50%]'} w-[48px] ease-in-out duration-300`} src={logo} alt="lol" />
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
  const [clickedIcon, setClickedIcon] = useState('directMessage')
  return (
    <NavbarContext.Provider value={{clickedIcon, setClickedIcon}}>
      <nav className='flex flex-col items-center gap-3 pt-4 h-screen w-[70px] bg-[#202225]'>
      <DirectMessages />
      <LineSeparator />
      <Server name={"Freda"}/>
      <Server name={"Khadija"}/>
      <AddServer name={"addServer"}/>
      <DiscoverServers name={"discover"}/>
    </nav>
    </NavbarContext.Provider>
  )
}

export default App

