import Layout from "../common/Layout"
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Popup from "../common/Popup";

export default function Youtube() {
  const pop = useRef(null);
  const [Vids, setVids] = useState([]);
  const [Index, setIndex] = useState(0);

  useEffect(() => {
    const key = 'AIzaSyCtN1lqIIdi7ibHkYVCtVtP9vA4oz8j8n8';
    const playList = 'PLlXUbM-Wv86W_pA2wzZgQ7pF1VeHP6At4';
    const num = 6; // 재생목록의 불러올 비디오 갯수
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playList}&maxResults=${num}`;

    axios.get(url).then((json) => {
      // console.log(json.data);
      setVids(json.data.items);
    })
  }, []);

  return (
    <>
      <Layout name={'Youtube'}>

          {Vids.map((data,index) => {

          const tit = data.snippet.title;
          const desc = data.snippet.description;
          const date = data.snippet.publishedAt;

          return(
            <article key={index}>
              <h3>{tit.length > 30 ? tit.substr(0, 30) + '...' : tit}</h3>
              <div className="txt">
                <p>{desc.length > 100 ? desc.substr(0, 100) : desc}</p>
                <span>{date.split('T')[0]}</span>
              </div>
              <div className="pic" onClick={() => { 
                pop.current.open();
                setIndex(index)
              }}>
                <img 
                  src={data.snippet.thumbnails.standard.url} 
                  alt={data.snippet.title} />
              </div>
            </article>
          );
        })}

      </Layout>
      <Popup ref={pop}>
        {Vids.length !== 0 && (
          <iframe src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`} frameBorder='0'></iframe>
        )}
      </Popup>
    </>

  )
}



