import React from "react";
import "../Asin/Asin.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { Amazon } from "./amazon.js";

const Asin = () => {
  const [datas, setDatas] = useState([]);
  const [limit, setLimit] = useState(0);
  const [search, setSearch] = useState("i phone");
  const [remain, setRemain] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [max_page, setMax_page] = useState(5);
  const [sort, setSort] = useState();
  const params = {
    api_key:"726BD395E4A941BE84DDA6079BC31115",
    type: "search",
    amazon_domain: "amazon.com",
    search_term: search,
    sort_by: sort,
    output: "json",
    max_page: max_page,
    page: page,
  };

  const Asin = () => {
    axios
      .get("https://api.asindataapi.com/request", { params })
      // axios.get(
      //   `https://api.asindataapi.com/request?api_key=A1E11367F8054C8FBCABAF48E4AE29E2&type=search&amazon_domain=amazon.com&search_term=${search}`
      // )
      .then((response) => {
        // print the JSON response from ASIN Data API
        setDatas(response.data.search_results);
        setRemain(response.data.request_info.topup_credits_remaining);
        if (response.data.search_results) {
          setLoading(false);
        }
        console.log("data", datas);
        
      })
      
      .catch((error) => {
        // catch and print the error
        console.log(error.response.statusText);
        setDatas(error.response.statusText);
        setLoading(false);
      });
    // setDatas(Amazon.search_results);
    // setRemain(Amazon.request_info.topup_credits_remaining);
  };
  // const handleSelectChange = (event) => {
  //   setSort(event)
  //   console.log(sort);
  //   if(sort==='option1'){
  //     console.log("option1");
  //     setDatas(Amazon.search_results.sort((a, b) => a.title.localeCompare(b.title)))
  //     console.log("changed",datas);
  //   }
  //   else if(sort==='option2'){
  //     console.log("option2");
  //     setDatas(Amazon.search_results.sort((a, b) =>b.title.localeCompare( a.title)))
  //   }
  //   else if(sort ==='option3'){
  //     console.log("option3");
  //     setDatas(Amazon.search_results.sort((a, b) =>parseFloat(b.price.value )- parseFloat(a.price.value)))
  //   }else{
  //     setDatas(Amazon.search_results.sort((a, b) => a.position-b.position))
  //   }
  // };

  // make the http GET request to ASIN Data API
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      Asin();
    }, 1000);
  }, [search, sort]);
  return (
    <>
      <div className="Home">
        <h1>Asin Data</h1>
        <p>Remain calls :{remain}</p>
        <div>
          <label htmlFor="my-select">Select an option:</label>
          <select
            id="my-select"
            onClick={(e) => {
              setSort(e.target.value);
            }}
          >
            <option value="price_low_to_high">price_low_to_high</option>
            <option value="price_high_to_low">price_high_to_low</option>
            <option value="featured">featured</option>
            <option value="average_review">average_review</option>
            <option value="most_recent">most_recent</option>
          </select>
        </div>
        <div className="search">
          <input
            placeholder="search name"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></input>
        </div>
        <table id="table">
         {loading ? (<td><div className="loader"><img src="https://res.cloudinary.com/ddupvpf6i/image/upload/v1683225108/loading-gif_ywx3zw.gif"></img></div></td>):( <><thead>
            <tr id="table-heads">
              <th>No</th>
              <th className="table-heads">
                Rating
                <img alt="image" className="sortLogo" src="sort.png"></img>
              </th>
              <th className="table-heads">
                Price
                <img alt="image" className="sortLogo" src="sort.png"></img>
              </th>
              <th className="table-heads">
                Title
                <img alt="image" className="sortLogo" src="sort.png"></img>
              </th>
              <th>Image</th>
            </tr>
          </thead><tbody>
              {datas.length==limit ? (
                  <tr>
                  <td colSpan={5}>No data found</td>
                </tr>
              ) : ( datas=="Payment Required" ? <tr>
              <td colSpan={5}>Payment Required</td>
            </tr>:
                datas.slice(limit,limit + 10).map((e, i) => (

                  <tr className="table-row" key={i}>
                    <td className="table-data">{i + 1}</td>
                    <td className="table-data">{e.rating}</td>
                    <td className="table-data">
                      {e.price ? e.price.raw : <span>not found</span>}
                    </td>
                    <td className="table-data" style={{ width: "14rem" }}>
                      {e.title}
                    </td>
                    <td className="table-data">
                      <img alt="image" className="images" src={e.image}></img>
                    </td>
                  </tr>
                ))
              
              )}
            </tbody></>)}
        </table>
        <div className="footer">
          <button
            className="prebutton"
            type="submit"
            id="prev"
            onClick={(e) => {
              if (limit <= 10) {
                setLimit(0);
              } else {
                setLimit(limit - 10);
              }
            }}
          >
            Prev
          </button>
          <button
            className="nextbutton"
            id="next"
            onClick={(e) => {
              if (limit > datas.length) {
                console.log(datas.length);
                setLimit(limit);
              } else {
                setLimit(limit + 10);
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};


export default Asin;