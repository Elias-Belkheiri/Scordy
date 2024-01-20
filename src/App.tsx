import { Server, AddServer, DiscoverServers } from './components/servers'
import { useState } from 'react'
import logo from './assets/logo.png'
import './output.css'

function DirectMessages (props) {
  return <div onClick={props.setClicked("directMessage")} className='directMessage flex flex-row items-center gap-2 relative'>
    <div className={`${props.isClicked ? 'h-[40px]' : 'h-[8px]'} w-[4px] bg-white rounded-r-[4px] fixed left-0`}></div>
    <img className='cursor-pointer rounded-[13px] w-[48px]' src={logo} alt="lol" />
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
  const [clicked, setClicked] = useState("directMessage");
  return <nav className='flex flex-col items-center gap-3 pt-4 h-screen w-[70px] bg-[#202225]'>
    <DirectMessages onClick={(str: string) => setClicked(str)} isClicked={clicked === "directMessage"} setClicked={(str: string) => setClicked(str)}/>
    <LineSeparator />
    <Server name={"Freda"} isClicked={clicked === "Freda"} setClicked={(str: string) => setClicked(str)}/>
    <Server name={"Hmeda"} isClicked={clicked === "Hmeda"} setClicked={(str: string) => setClicked(str)}/>
    <AddServer />
    <DiscoverServers />
  </nav>

}

export default App

