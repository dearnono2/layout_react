import Layout from "../common/Layout";
import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import Masonry from 'react-masonry-component';

export default function Gallery() {
  const masonryOptions = { transitionDuration: '0.5s' };
  const [Items, setItems] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [EnableClick, setEnableClick] = useState(true);
  const frame = useRef(null);
  const input = useRef(null);

    /*
  interest 방식 호출
  getFlickr({
    type: 'interest',
  })
  search 방식 버튼
  getFlickr({
    type:'search',
    tags: '검색키워드',
  })
  */

  const getFlickr = async (opt) => {
    const key = '2b77b0bf16caab8d0940ed8495c064dc';
    const method_interest = 'flickr.interestingness.getList';
    const method_search = 'flickr.photos.search';
    const num = 500;
    let url = '';

    if (opt.type === 'interest') {
      url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
  }
    if (opt.type === 'search') {
      url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
    }

    // await axios.get(url).then((json) => {
    //   setItems(result.data.photos.photo);
    // })

    const result = await axios.get(url);
    setItems(result.data.photos.photo);
    
    // 셋타임아웃으로 비동기화 시키고 1초 딜레이를 준 뒤 로딩바를 안보이게 false로 바꾼 뒤에 on을 프레임에 붙여서 보이게한다.
    setTimeout(() => {
      setLoading(false);
      frame.current.classList.add('on');

      setTimeout(() => {
        setEnableClick(true);
      }, 1000) // 프레임에 on 붙이고 위로 올라오는 모션기간동안 0.5초 홀딩

    }, 2000) // 이미지 호출이 완료되고 masonry모션 적용시간까지 홀딩하는 1초

  };

  useEffect(() => getFlickr({ type: 'interest' }), []);
  //함수의 정의 형태로 콜백함수가 들어와야 한다, 함수를 단순 호출하는 형태는 읽어들일 수 없다
  

  return (
    <Layout name={'Gallery'}>
      {Loading && (
        <img
          className="loading"
          src={`${process.env.PUBLIC_URL}/img/6.gif`}
        />
      )}
      <div className="controls">
        <nav>
          <button
            onClick={() => {
              if(!EnableClick) return;
              // 모션중이면 false일태나 return으로 방지
              setEnableClick(false);
              // true로 들어와서 다시 false로 바꾸어 재이벤트 방지
              setLoading(true);
              frame.current.classList.remove('on');
              getFlickr({ type: 'interest' });
            }}>
              Interest Gallery
          </button>
          <button 
            onClick={() => {
              if(!EnableClick) return;
              setEnableClick(false);
              setLoading(true);
              frame.current.classList.remove('on');
              getFlickr({ type: 'search', tags: 'landscape' });
            }}>
              Search Gallery
          </button>
        </nav>
        <div className="searchBox">
          <input type="text" ref={input} placeholder='검색어를 입력하세요' />
          <button 
            onClick={() => {
              const result = input.current.value;
              input.current.value = '';
              if(!EnableClick) return;
              setEnableClick(false);
              setLoading(true);
              frame.current.classList.remove('on');
              getFlickr({ type: 'search', tags: result, });
            }}>
              Search
          </button>
        </div>
      </div>
      
      <div className="frame" ref={frame}>
        <Masonry elementType={'div'} options={masonryOptions}>

          {Items.map((item, idx) => {
            return (
              <article key={idx}>
                <div className="inner">
                  <div className="pic">
                    <img 
                      src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title}>
                    </img>
                  </div>
                  <h2>{item.title}</h2>
                </div>
              </article>
            )
          })}
        </Masonry>
      </div>
    </Layout>
  )
}

/*

? 형태는 쿼리스트링하는 형태의 방법이다. 
쿼리 스트링은 ??

사용자가 입력 데이터를 전달하는 방법중의 하나로 url 주소에 미리 협의된 데이터를 파라미터를 통해 넘기는 것을 말한다. 
파라미터는 물음표 뒤에 = 으로 연결된 key value 부분을 말한다. 
url에 붙여서 추가적인 정보를 서버측에 전달하는 내용이다. 
클라이언트가 어떤 특정 리소스에 접근하고 싶어하는지의 정보를 담는것. 

형식(방법)
- 정해진 엔드포인트 주소 이후에 ?를 쓰는 것으로 쿼리스트링이 시작함을 알린다. 
- parameter = value로 필요한 파라미터의 값을 적는다. 
- 파라미터가 여러개일 경우 &를 붙여서 여러개의 파라미터를 넘길 수 있다. 
- 엔드포인트주소/ 추가적인주소 ? 파라미터=값&파라미터=값

*/