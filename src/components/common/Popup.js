// popup은 사이트 내의 팝업 부분의 모션에 영향을 준다. ex) 이미자나 유튜브 영상을 클릭하면 뜨는 화면.

import { useState, forwardRef, useEffect, useImperativeHandle } from "react";
import {motion, AnimatePresence} from 'framer-motion';

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
    // 모션을 걸고 싶은 요소를 AnimatePresence로 감싸준다. 그리고 모션을 걸 요소의 앞에 motion. 을 붙여준다.
    // initial에 
    <AnimatePresence>
      {Open && (
        <motion.aside className="pop" 
          initial={{ opacity: 0, scale: 0, }} 
          animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }} 
          exit={{ opacity: 0, scale: 0, transition: { duration: 0.5, delay: 0.5 } }}>
          <motion.div className="con"
          initial={{opacity: 0}}
          animate={{opacity: 1, transition: { duration: 0.5, delay: 1 }}}
          exit={{opacity: 0, transition: { delay: 0 }}}
          >{props.children}</motion.div>
          <motion.span
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 1.5 } }}
            className="close" onClick={() => { setOpen(false) }}>close</motion.span>
        </motion.aside>
      )}
    </AnimatePresence>
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