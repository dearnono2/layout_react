import { useRef, useEffect } from 'react';

function Layout(props) {
  const frame = useRef(null);

  useEffect (() => {
    // 마운트 되었을 때
    frame.current.classList.add('on');
  }, []);

  return (
    <section className={`content ${props.name}`} ref={frame}>
      <figure>
        <img src={`${process.env.PUBLIC_URL}/img/${props.name}.jpg`} alt={props.name} />
      </figure>
      <div className="inner">
        <h1>{props.name}</h1>
        {props.children}
      </div>
    </section>
  );
}
export default Layout;

/**
useEffect

- 컴포넌트가 마운트 되었을 때
=> 처음나타났을 때 <---
=> props로 받은 값을 컴포넌트의 로컬상태로 설정할 때
=> 외부 API요청이 있을 때
=> setInterval, setTimeout을 통해 작업이 예약될 때

- 컴포넌트가 언마운트 되었을 때
=> 사라질 때
=> setInterval, setTimeout을 사용하여 등록한 작업들이 클리어 되었을 때
=> 라이브러리 인스턴스가 제거되었을 때

- 컴포넌트가 업데이트될 때
=> 특정 props가 바뀔 때

useRef

- js로 비유하자면 쿼리셀렉터로 해당 돔을 선택하는 용도(참조)
- 변수를 저장하는 용도로 사용하는 이유: 렌더링을 발생시키지 않음. 변하지 않음.
current : ()  <=== 해당값이 저장됨.

*/