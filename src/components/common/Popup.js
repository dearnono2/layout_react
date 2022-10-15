import { useEffect } from "react";

function Popup(props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return() => {
      document.body.style.overflow = 'auto';
    }
  }, []);
  
  return(
    <aside className="pop">
      <div className="con">{props.children}</div>
      <span className="close" onClick={() => { props.setOpen(false) }}>close</span>
    </aside>
  );
}

export default Popup;