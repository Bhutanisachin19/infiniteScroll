//custom hook

import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Waypoint } from "react-waypoint";

import "./GetData.css";

export default function GetData({ limit, setLimit }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log("Loading", loading);
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
      )
      .then((res) => {
        console.log(res.data);
        setData([...data, ...res.data]);
        setLoading(false);
      });
    // setLoading(true);
    console.log("Api Called");
  }, [page]);

  return (
    <div className="main-div">
      <br />
      <br />
      {page == 1 && loading && <h1>Loading....</h1>}
      {data &&
        data.map((d, index) => (
          <>
            <div className="data-div">
              <br />
              <p>{d.id}</p>
              <h1>{d.title}</h1>
              <h4>{d.body}</h4>
              <br />
            </div>

            {index === data.length - 4 && (
              <Waypoint
                onEnter={() => {
                  console.log("on Enter Called");
                  setLoading(true);
                  setPage(page + 1);
                }}
              />
            )}
          </>
        ))}
      {page > 1 && loading && <h1>Loading....</h1>}
    </div>
  );
}
