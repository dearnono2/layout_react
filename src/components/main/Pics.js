function Pics({ Scrolled, start }) {
  // 변수 = 특정값 || 대체값;
  // 변수에 대입되는 특정값이 undifined, NaN같이 비정상적인 값이 들어올때 대신 적용될 대체값을 설정해주는것.
  const position = Scrolled - start || 0;
  // position => 전체 스크롤 거리값에서 해당 섹션요소의 세로 위치값을 뺀것으로, 처음 섹션의 초입에는 0이된다.
  // console.log(position);
  return(
    <main id="pics" className='myScroll'>
      <p style={{ left: 100 + position, }}>FLICKER</p>
      <h3 style={{ left: 100 + position / 2, }}>FLICKER</h3>
    </main>
  );
}

export default Pics;