import Anime from '../../asset/Anime';
import React, { useRef } from "react"


const btn = {
  position: 'absolute',
  top: 120,
  left: 100,
}

export default function Visual() {


  return (
    <figure id="visual" className='myScroll'>
      <button
      style={btn}
      onClick={() => {
        new Anime(window, {
          prop: 'scroll',
          value: 6000,
          duration: 500,
        })
      }}

      >button</button>

    </figure>
  )
}
