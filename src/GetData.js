//custom hook

import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Waypoint } from "react-waypoint";

export default function GetData({ limit, setLimit }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  //   const watcher = useRef();
  //   const lastElementRef = useCallback(
  //     node => {
  //       console.log(node);
  //       if (loading) return;
  //       if (watcher.current) watcher.current.disconnect();
  //       watcher.current = new IntersectionObserver(enteries => {
  //         if (enteries[0].isIntersecting) {
  //           console.log("Visible");
  //           setLimit(prevLimit => prevLimit + 5);
  //         }
  //         //
  //       });
  //       if (node) watcher.current.observe(node);
  //     },
  //     [loading]
  //   );

  //   let limit = 10;

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
      )
      .then(res => {
        console.log(res.data);
        setData([...data, ...res.data]);
        setLoading(false);
      });
    setLoading(true);
  }, [page]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setLoading(true);
    setPage(page + 1);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <div>
      {loading && <h1>Loading....</h1>}
      {data &&
        data.map(d => (
          <div>
            {console.log("d length", data.length)}
            <br />
            <p>{d.id}</p>
            <h1>{d.title}</h1>
            <h4>{d.body}</h4>
            <br />
          </div>
        ))}
      {/* <button onClick={firstEvent}>clickme</button> */}
      {/* <Waypoint onEnter={setLimit(prevLimit => prevLimit + 5)} /> */}

      {/* {loading && <h1>Loading....</h1>}
      {data &&
        data.map((d, index) => {
          if (data.length === index + 1) {
            return (
              <div ref={lastElementRef} className="data-div">
                {console.log("d length", data.length)}
                <br />
                <p>{d.id}</p>
                <h1>{d.title}</h1>
                <h4>{d.body}</h4>
                <br />
              </div>
            );
          } else {
            return (
              <div className="data-div">
                {console.log("INdex", index)}

                <br />
                <p>{d.id}</p>
                <h1>{d.title}</h1>
                <h4>{d.body}</h4>
                <br />
              </div>
            );
          }
        })} */}
    </div>
  );
}
