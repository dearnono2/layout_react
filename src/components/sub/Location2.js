import { useEffect, useRef } from "react"; // useEffect와 useRef를 react로부터 연결
import Layout from "../common/Layout"; // 홈페이지 화면에 나타날 Layout.js와 연결

export default function Location() {

  // window 객체가 kakao객체를 사용할 수 있도록 하는 코드
  const { kakao } = window;

  const container = useRef(null);

  const option = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
  };
  // 마커 위치 인스턴스 생성
  const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
  const imageSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
  const imageSize = new kakao.maps.Size(232, 99);
  const imageOption = { offset: new kakao.maps.Point(116, 99) };

  const markerImage = new kakao.maps.MarkerImage(
    imageSrc, 
    imageSize, 
    imageOption
  );

  // 위치 인스턴스 값을 인수로 전달해서 다시 마커 인스턴스 생성
  const marker = new kakao.maps.Marker({ // maps뒤에 붙은 Marker는 뭘까? => kakao 객체 안에 내장되어 있는 함수다! window.kakao 해서 보니까 나옴.
    position: markerPosition,
    image: markerImage
  });

  useEffect(() => {
    // 지도 인스턴스 최종 생성
    const map_instance = new kakao.maps.Map(container.current, option); // container 뒤에 붙은 current는 뭐냐...?
    
    // 지도 인스턴스를 활용해서 마커를 생성하는 코드
    marker.setMap(map_instance);
  }, []);

}