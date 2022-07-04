import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  ProfileFilled,
  HomeTwoTone,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../redux/actions/auth";

const { Item } = Menu;

const home = {
  label: "Kikao ",
  key: "home",
  to: "/",
  icon: <HomeTwoTone />,
};

const guestLinks = [
  {
    label: "Sign Up",
    key: "sign-up",
    to: "/sign-up",
    icon: <UserAddOutlined />,
  },
  {
    label: "Log In",
    key: "log-in",
    to: "/log-in",
    icon: <LoginOutlined />,
    disabled: false,
  },
];

const userLinks = [
  {
    label: "Your Proflie",
    to: "/profile",
    key: "profile",
    icon: <ProfileFilled />,
  },
  {
    label: "Log Out",
    key: "logout",
    icon: <LogoutOutlined />,
  },
];

const logoutRedirect = "/";

const App = () => {
  const [menu, setMenu] = useState(guestLinks);

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (e) => {
    if (e.key === "logout") {
      dispatch(logoutUser());
      navigate(logoutRedirect);
    }
  };

  useEffect(() => {
    if (auth.isAuth) {
      setMenu(userLinks);
    } else {
      setMenu(guestLinks);
    }
  }, [auth]);

  return (
    <Menu theme="light" onClick={onClick}>
      <Item icon={home.icon} key={home.key}>
        <Link to={home.to}> {home.label}</Link>
      </Item>
      {renderMenuItems(menu)}
    </Menu>
  );
};

function renderMenuItems(items) {
  return items.map((item) => {
    const { icon, to, label, key } = item;
    return (
      <Item icon={icon} key={key}>
        {to ? <Link to={to}> {label}</Link> : <>{label}</>}
      </Item>
    );
  });
}

export default App;
