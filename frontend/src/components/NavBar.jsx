import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../redux/actions/auth";

const { Item } = Menu;

const guestLinks = [
  {
    label: "Sign Up",
    key: "sign-up",
    to: "/sign-up",
    icon: <LoginOutlined />,
  },
  {
    label: "Log In",
    key: "log-in",
    to: "/log-in",
    icon: <AppstoreOutlined />,
    disabled: false,
  },
];

const userLinks = [
  {
    label: "Your Proflie",
    to: "/profile",
    key: "profile",
    icon: <LogoutOutlined />,
  },
  {
    label: "Log Out",
    key: "logout",
    icon: <LogoutOutlined />,
  },
];

const logoutRedirect = "/";

const App = () => {
  const [current, setCurrent] = useState("mail");
  const [menu, setMenu] = useState(guestLinks);

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (e) => {
    setCurrent(e.key);
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
      {renderMenuItems(menu)}
    </Menu>
  );
};

function renderMenuItems(items) {
  return items.map((item, index) => {
    const { icon, to, label, key } = item;
    return (
      <Menu.Item icon={icon} key={key}>
        {to ? <Link to={to}> {label}</Link> : <>{label}</>}
      </Menu.Item>
    );
  });
}

export default App;
