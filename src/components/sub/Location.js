import { useEffect, useRef, useState } from "react";
import Layout from "../common/Layout"

export default function Location() {

  const { kakao } = window;
  // 윈도우 객체에 등록되어 있는 카카오키를 변수명으로 비구조화할당을 한것.
  // 윈도우 객체가 카카오 객체를 사용할 수 있도록 하는 코드.
  // const kakao = (window).kakao;

  const info = [
    {
      title: '삼성동 코엑스',
      latlng: new kakao.maps.LatLng(33.450701, 126.570667),
      imgUrl: `${process.env.PUBLIC_URL}/img/marker1.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) }
    },
    {
      title: '올림픽 공원',
      latlng: new kakao.maps.LatLng(37.5206868, 127.1214941),
      imgUrl: `${process.env.PUBLIC_URL}/img/marker2.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) }
    },
    {
      title: '서울 시청',
      latlng: new kakao.maps.LatLng(37.5657037, 126.9768616),
      imgUrl: `${process.env.PUBLIC_URL}/img/marker3.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) }
    },
  ];



  // 리얼돔에서 참조하는 방법으로 querySelector 등의 방법은 가상돔인 리액트에서는 사용할 수 없다. 그래서 리액트에서는 useRef라는 훅을 이용해서 가상으로 생성된 DOM을 이용할 수 있다.
  const container = useRef(null);
  // useRef를 이용해서 가상돔을 참조할 변수로 컨테이너를 생성한 뒤, null 값으로 빈 구역을 만들어둠.
  const btns = useRef(null);

  const [Location, setLocation] = useState(null);
  // useEffect에서 만들어진 지도 인스턴스를 담을 state를 생성하는 것

  const [Traffic, setTraffic] = useState(false);
  // Traffic 토글 기능 구현을 위한 state를 추가, 불린값을 부여한다.

  const [Info] = useState(info);
  // setInfo는 info가 바뀔 일이 없으므로 필요가 없다.

  const [Index, setIndex] = useState(0);
  // 인덱스가 변화될 때 렌더링이 필요하므로 useState에 담아 관리한다.
  
  const option = { //지도를 생성할 때 필요한 기본 옵션
    center: Info[Index].latlng, //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
  };
  const markerPosition  = Info[Index].latlng; // 마커위치 인스턴스 생성
  const imageSrc = Info[Index].imgUrl;
  const imageSize = Info[Index].imgSize;
  const imageOption = Info[Index].imgPos;
  // 마커 이미지 변경에 필요한 정보값 3개를 등록

  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption
  );

  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage
  });
  // 위치 인스턴스 값을 인수로 전달해서 다시 마커 인스턴스 생성

  
  useEffect(() => {
    container.current.innerHTML = '';

    // 지도 인스턴스 최종생성
    const map_instance = new kakao.maps.Map(container.current, option); //지도 인스턴스를 활용해서 마커를 생성하는 코드
    marker.setMap(map_instance);
    setLocation(map_instance);

    const mapTypeControl = new kakao.maps.MapTypeControl();
    map_instance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    const zoomControl = new kakao.maps.ZoomControl();
    map_instance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    for(const btn of btns.current.children) btn.classList.remove('on');
    btns.current.children[Index].classList.add('on');


    window.addEventListener('resize', () => {
      map_instance.setCenter(Info[Index].latlng);
    })
  }, [Index]); // <-- 기존 컴포넌트가 처음 마운트 되었을 때만 지도를 출력하던 방식에서, Index가 변경될 때 지도가 다시 렌더링 하는 방식으로 바꿈.


  // 트래픽 토글 전용 useEffect 
  useEffect(() => {
    if(!Location) return;
    // Location state의 값은 두번째 호출부터 값이 담겨 사이클이 돌아가므로 처음 값이 존재하지 않는 초기 오류방지를 위해 조건문 처리함.

    // 트레픽 값에 따라서 생성과 삭제로 나누어서 코드를 제공, 구현.
    Traffic 
    ? Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
    : Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) 

  }, [Traffic]); // traffic state의 값이 변경될 때마다 실행이 되는 구문.


  return (
    <Layout name={'Location'}>
      <div id="map" ref={container}></div>

      <div className="btnSet">

      {/* 기존의 두개의 버튼에서 한개의 토글 버튼으로 바꿈.
          버튼 클릭시 트래픽 값을 반전처리 => !Traffic
      */}
        <button onClick={() => { setTraffic(!Traffic) }
        }>
          {/* Traffic의 값에 따라서 버튼의 내용도 변경 */}
        { Traffic ? 'Traffic OFF' : 'Traffic ON'}
      </button>

        <ul className="branch" ref={btns}>
          {/* 각 버튼을 클릭할 때마다 Index의 값을 변경 */}
          {
            Info.map((el, idx) => {
              return(
                <li key={idx} onClick={() => setIndex(idx)}>
                  {el.title}
                </li>
              );
            })
          }
        </ul>
      </div>


    </Layout>
  );
}