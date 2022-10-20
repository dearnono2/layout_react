import { useEffect, useState } from "react";

function News() {

  const getLocalData = () => {
    const dummyPosts = [
      {title: 'Hello5', content: 'Here comes description in details'},
      {title: 'Hello4', content: 'Here comes description in details'},
      {title: 'Hello3', content: 'Here comes description in details'},
      {title: 'Hello2', content: 'Here comes description in details'},
      {title: 'Hello1', content: 'Here comes description in details'},
    ];

    const data = localStorage.getItem('post');

    if(data) {
      return JSON.parse(data);
    } else {
      return dummyPosts;
    }  
  };

  // const [Posts, setPosts] = useState([]);
  const [Posts] = useState(getLocalData());

  useEffect(() => {
    localStorage.setItem('post', JSON.stringify(Posts));
  }, []);

  return(

    <main id="news" className='myScroll'>
      <h1>News</h1>
      {Posts.map((post, idx) => {
        if(idx >= 5) return; // 5개의 인덱스만 가져다 달라는 의미

        return(
          <article key={idx}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </article>
        );
      })}
    </main>
  );
}

export default News;