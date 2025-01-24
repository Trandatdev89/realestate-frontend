import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../../img/lotus.webp";
import { useEffect, useState } from "react";
import Bars from "../Bars";
import { isValidToken } from "../../../Auth/isValidToken";
import DropdownUser from "../../Dropdown/DropdownUser";

export default function Header() {
  const [show, setShow] = useState(false);
  const reload = useSelector((state) => state.Reload);
  const isValid = isValidToken();


  const handleClick = (e) => {
    return e.isActive ? "Header__link Header__link--active" : "Header__link";
  };
  const showBar = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="Header">
        <div className="Header__logo">
          <Link to="/">
            <img src={logo} alt="dang tai anh" />
          </Link>
        </div>
        <ul className="Header__list">
          <li className="Header__item">
            <NavLink to="/" className={handleClick}>
              Tuyển dụng
            </NavLink>
          </li>
          <li className="Header__item">
            <NavLink
              to="/"
              className={handleClick}
            >
              Hồ sơ nhà đất
            </NavLink>
          </li>
          <li className="Header__item">
            <NavLink to="/" className={handleClick}>
              Công ty
            </NavLink>
          </li>
          <li className="Header__item">
            <NavLink to="/" className={handleClick}>
              Tin tức
            </NavLink>
          </li>
        </ul>

        <div className="Header__login">
          {isValid ? (
            <>
              <DropdownUser/>
            </>
          ) : (
            <>
              <Link to="/auth/register" style={{ color: "#fff" }}>
                <button className="btn btn-primary">Đăng ký</button>
              </Link>
              <Link to="/auth/login" style={{ color: "#fff" }}>
                <button className="btn btn-primary">Đăng nhập</button>
              </Link>
            </>
          )}
        </div>
        <div className="Header__bar" onClick={showBar}>
          {show ? <CloseOutlined /> : <MenuOutlined />}
        </div>
      </div>
      {show ? <Bars setShow={setShow} /> : ""}
    </>
  );
}
