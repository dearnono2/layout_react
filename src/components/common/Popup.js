import { useState, forwardRef, useEffect, useImperativeHandle } from "react";

const Popup = forwardRef((props, ref) => {

  const [Open, setOpen] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
    };
  });

  // useEffect(() => {
  //   document.body.style.overflow = 'hidden';
  //   return() => {
  //     document.body.style.overflow = 'auto';
  //   }
  // }, []);

  useEffect(() => {
    Open ? (document.body.style.overflow = 'hidden')
        : (document.body.style.overflow = 'auto');
  }, [Open]);
  
  return(
    <>
      {Open && (
        <aside className="pop">
          <div className="con">{props.children}</div>
          <span className="close" onClick={() => { setOpen(false) }}>close</span>
        </aside>
      )}
    </>
  );
});


export default Popup;

/*

forwardRef
단계1 - 기존의 컴포넌트 함수를 popup이라는 컴포넌트 함수를 대입형(선언형을 대입형으로 전환해줘야한다.)

단계2 - 해당 화살표 함수를 forwordRef로 감싸고 인수로 전달한다. 

단계3 - 화살표 함수(forwardRef로 전달되는) 두번째 인수로 ref 추가

단계4 - fowardRef 안쪽에 useImperativeHandle 함수를 호출한다. 

단계5 - 해당함수를 객체를 반환해서 해당객체값을 부모 컴포넌트로 전달

단계6 - 부모컴포넌트에 useRef로 forwardRef로 전달되는 자식 컴포넌트를 참조한다. 

단계7 - 

*/