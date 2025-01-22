import React, { useEffect, useState } from "react";
import "./style.css";
import { Spin, message } from "antd";
import { login } from "../Services/AuthServices";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReloadLayout } from "../Action/ReloadLayout";
import { configOauth } from "../configurations/configGoogle";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [spining, setSpining] = useState(false);

  const data = useSelector((state) => state.Reload);

  const handleSubmit = async (e) => {
    setSpining(true);
    e.preventDefault();
    const userName = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    const data = {
      username: userName,
      password: password,
    };
    const result = await login(data);
    console.log(result);
    if (result.data) {
      messageApi.open({
        type: "success",
        content: "Đăng nhập thành công",
      });
      localStorage.setItem("token", result.data.token);
      dispatch(ReloadLayout(!data));
      navigate("/");
    } else {
      setSpining(false);
      messageApi.open({
        type: "error",
        content: `${result.message}`,
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    // Nếu có token và chưa reload
    if (token && !hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload(); // Reload trang
    }
  }, []);

  const loginGoogle = () => {
    const callbackUrl = configOauth.redirectUri;
    const authUrl = configOauth.authUri;
    const googleClientId = configOauth.clientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

    console.log(targetUrl);

    window.location.href = targetUrl;
  };

  return (
    <>
      {contextHolder}
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{ width: "185px" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">
                          We are The Lotus Team
                        </h4>
                      </div>
                      <Spin spinning={spining} tip="Đang đăng nhập">
                        <form onSubmit={handleSubmit}>
                          <p>Please login to your account</p>

                          <div
                            data-mdb-input-init
                            className="form-outline mb-4"
                          >
                            <input
                              type="text"
                              id="form2Example11"
                              className="form-control"
                              placeholder="Phone number or email address"
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example11"
                            >
                              Username
                            </label>
                          </div>

                          <div
                            data-mdb-input-init
                            className="form-outline mb-4"
                          >
                            <input
                              type="password"
                              id="form2Example22"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example22"
                            >
                              Password
                            </label>
                          </div>

                          <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                              type="submit"
                            >
                              Log in
                            </button>
                            <div className="d-flex align-items-center justify-content-center pb-4">
                              <button
                                type="button"
                                className="login-with-google-btn"
                                onClick={loginGoogle}
                              >
                                Sign in with Google
                              </button>
                            </div>
                          </div>

                          <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2">Don't have an account?</p>
                            <Link to="/auth/register">
                              <button
                                type="button"
                                data-mdb-button-init
                                data-mdb-ripple-init
                                className="btn btn-outline-danger"
                              >
                                Create new
                              </button>
                            </Link>
                          </div>
                        </form>
                      </Spin>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
