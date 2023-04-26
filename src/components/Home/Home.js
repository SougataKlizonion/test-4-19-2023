import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate, Link } from "react-router-dom";

const Home = (e) => {
  const access_token = localStorage.getItem("token");

  const [names, setNames] = useState({});
  const [limit, setLimit] = useState(5);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("phone");
  const [asc, setAsc] = useState(-1);
  const [count, setCount] = useState("");
  const [value, setValue] = useState(1);
  const navigate = useNavigate();
  const preview = () => {
    setValue(value - 5);
    setPage(page - 1);
    if (page <= 1) {
      setValue(value);
      setPage(1);
    }
  };

  const next = () => {
    setValue(value + 5);
    if (limit > count) {
      setValue(1);
      setPage(1);
    } else {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (!access_token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    try {
      const GetApi = async (e) => {
        const res = await axios.get(
          `http://localhost:2023/api/v1/data?limit=${limit}&sort=phone&page=${page}&asc=-1`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        setList(res.data.users);
        setCount(res.data.users.length);
        setLoading(false);
      };
      GetApi();
    } catch (error) {
      console.log("error");
      alert("failed to load page");
    }
  }, [page]);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const searchFilter = async (e) => {
    try {
      setNames(e.target.value);
      const response = await axios.post("http://localhost:2023/api/v1/search", {
        name: names,
      });
      setList(response.data);
      setLoading(true);
    } catch (error) {}
  };

  const sortName = async (e) => {
    setAsc(asc * -1);
    setSort("name")
    const response = await axios.get(
      `http://localhost:2023/api/v1/name?limit=${limit}&sort=${sort}&page=${page}&asc=${asc}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    setList(response.data.users);
  };
  const sortPhone = async (e) => {
    setAsc(asc * -1);
    setSort("phone")
    const response = await axios.get(
      `http://localhost:2023/api/v1/name?limit=${limit}&sort=${sort}&page=${page}&asc=${asc}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    setList(response.data.users);
  };
  const sortEmail = async (e) => {
    setAsc(asc * -1);
    setSort("email")
    const response = await axios.get(
      `http://localhost:2023/api/v1/name?limit=${limit}&sort=${sort}&page=${page}&asc=${asc}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    setList(response.data.users);
  };
  return (
    <div className="Home">
      <h1>Users</h1>
      <button className="logOut" onClick={logOut}>
        Logout
      </button>
      <div className="search">
        <input placeholder="search name" onChange={searchFilter}></input>
      </div>
      <table id="table">
        <thead>
          <tr id="table-heads">
            <th>No</th>
            <th className="table-heads" onClick={sortName}>
              Name
              <img alt="image" className="sortLogo" src="sort.png"></img>
            </th>
            <th className="table-heads" onClick={sortPhone}>
              Phone
              <img alt="image" className="sortLogo" src="sort.png"></img>
            </th>
            <th className="table-heads" onClick={sortEmail}>
              Email
              <img alt="image" className="sortLogo" src="sort.png"></img>
            </th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((e, i) => (
              <tr className="table-row">
                <td className="table-data">{value + i}</td>
                <td className="table-data">
                  <Link className="link" to={`/user/${e._id}`}>
                    {e.name}
                  </Link>
                </td>
                <td className="table-data">
                  <Link className="link" to={`/user/${e._id}`}>
                    {e.phone}
                  </Link>
                </td>
                <td className="table-data">
                  <Link className="link" to={`/user/${e._id}`}>
                    {e.email}
                  </Link>
                </td>
                <td className="table-data">
                  <Link className="link" to={`/user/${e._id}`}>
                    {" "}
                    <img alt="image" className="images" src={e.image}></img>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No data found</td>
            </tr>
          )}
        </tbody>
        <tfoot className="buttonrow"></tfoot>
      </table>
      <div className="footer">
        <button className="prebutton" type="submit" id="prev" onClick={preview}>
          Prev
        </button>
        <button className="nextbutton" id="next" onClick={next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
