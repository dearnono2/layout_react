
export default function Visual() {

  return (
    <figure id="visual" className='myScroll'>
      <video src={process.env.PUBLIC_URL + '/img/vid2.mp4'} loop autoPlay muted></video>
    </figure>
  )
}
