import { Carousel } from "antd";
import React from "react";
import anh1 from "../../img/hero-carousel-1.jpg";
import anh2 from "../../img/hero-carousel-2.jpg";
import anh3 from "../../img/hero-carousel-3.jpg";
import avatar1 from "../../img/team-1.jpg"
import avatar2 from "../../img/team-2.jpg"
import avatar3 from "../../img/team-3.jpg"

import "./scss/style.scss";

import { MdOutlineRadar } from "react-icons/md";
import Building from "./Building";
export default function Home() {
  return (
    <>
      <div className="Home">
        <div className="Banner">
          <Carousel arrows autoplay>
            <div className="Banner__wrap">
              <div className="Banner__img">
                <img src={anh1} alt="loading.." />
              </div>
              <div className="Banner__content">
                <h1 className="Banner__title">
                  <span style={{ color: "#2eca6a" }}>247</span> Venda Road Five
                </h1>
                <p className="Banner__desc">Doral, Florida</p>
                <button className="Banner__btn">sale | $ 356.000</button>
              </div>
            </div>
            <div className="Banner__wrap">
              <div className="Banner__img">
                <img src={anh2} alt="loading.." />
              </div>
              <div className="Banner__content">
                <h1 className="Banner__title">
                  <span style={{ color: "#2eca6a" }}>247</span> Venda Road Five
                </h1>
                <p className="Banner__desc">Doral, Florida</p>
                <button className="Banner__btn">sale | $ 356.000</button>
              </div>
            </div>
            <div className="Banner__wrap">
              <div className="Banner__img">
                <img src={anh3} alt="loading.." />
              </div>
              <div className="Banner__content">
                <h1 className="Banner__title">
                  <span style={{ color: "#2eca6a" }}>247</span> Venda Road Five
                </h1>
                <p className="Banner__desc">Doral, Florida</p>
                <button className="Banner__btn">sale | $ 356.000</button>
              </div>
            </div>
          </Carousel>
        </div>
        <div className="wrapper">
          <Building/>
          <div className="container">
            <div className="services">
              <div className="row">
                <div className="col-12">
                  <div className="BoxHead">
                    <h1 className="BoxHead__title">Our Services</h1>
                    <p className="BoxHead__desc">
                      Necessitatibus eius consequatur ex aliquid fuga eum quidem
                      sint consectetur velit
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                  <div className="services__box">
                    <div className="services__icon">
                      <MdOutlineRadar />
                    </div>
                    <div className="services__title">Nesciunt Mete</div>
                    <div className="services__desc">
                      Provident nihil minus qui consequatur non omnis maiores.
                      Eos accusantium minus dolores iure
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                  <div className="services__box">
                    <div className="services__icon">
                      <MdOutlineRadar />
                    </div>
                    <div className="services__title">Nesciunt Mete</div>
                    <div className="services__desc">
                      Provident nihil minus qui consequatur non omnis maiores.
                      Eos accusantium minus dolores iure
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                  <div className="services__box">
                    <div className="services__icon">
                      <MdOutlineRadar />
                    </div>
                    <div className="services__title">Nesciunt Mete</div>
                    <div className="services__desc">
                      Provident nihil minus qui consequatur non omnis maiores.
                      Eos accusantium minus dolores iure
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                  <div className="services__box">
                    <div className="services__icon">
                      <MdOutlineRadar />
                    </div>
                    <div className="services__title">Nesciunt Mete</div>
                    <div className="services__desc">
                      Provident nihil minus qui consequatur non omnis maiores.
                      Eos accusantium minus dolores iure
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                  <div className="services__box">
                    <div className="services__icon">
                      <MdOutlineRadar />
                    </div>
                    <div className="services__title">Nesciunt Mete</div>
                    <div className="services__desc">
                      Provident nihil minus qui consequatur non omnis maiores.
                      Eos accusantium minus dolores iure
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
                  <div className="services__box">
                    <div className="services__icon">
                      <MdOutlineRadar />
                    </div>
                    <div className="services__title">Nesciunt Mete</div>
                    <div className="services__desc">
                      Provident nihil minus qui consequatur non omnis maiores.
                      Eos accusantium minus dolores iure
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="agents">
              <div className="row">
                <div className="col-12">
                  <div className="BoxHead">
                    <h1 className="BoxHead__title">Our Services</h1>
                    <p className="BoxHead__desc">
                      Necessitatibus eius consequatur ex aliquid fuga eum quidem
                      sint consectetur velit
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="agents__member">
                    <div className="agents__pic">
                      <img
                        src={avatar1}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="agents__member-info">
                      <h4>William Anderson</h4>
                      <span>
                        Sale manager
                        <br />
                      </span>
                      <div className="agents__social">
                        <a href="/">
                          <i className="bi bi-twitter-x"></i>
                        </a>
                        <a href="/">
                          <i className="bi bi-facebook"></i>
                        </a>
                        <a href="/">
                          <i className="bi bi-instagram"></i>
                        </a>
                        <a href="/">
                          <i className="bi bi-linkedin"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="agents__member">
                    <div className="agents__pic">
                      <img
                        src={avatar2}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="agents__member-info">
                      <h4>William Anderson</h4>
                      <span>
                        Sale manager
                        <br />
                      </span>
                      <div className="agents__social">
                        <a href="/">
                          <i className="bi bi-twitter-x"></i>
                        </a>
                        <a href="/">
                          <i className="bi bi-facebook"></i>
                        </a>
                        <a href="/">
                          <i className="bi bi-instagram"></i>
                        </a>
                        <a href="/">
                          <i className="bi bi-linkedin"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div className="agents__member">
                    <div className="agents__pic">
                      <img
                        src={avatar3}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="agents__member-info">
                      <h4>William Anderson</h4>
                      <span>
                        Sale manager
                        <br />
                      </span>
                      <div className="agents__social">
                        <a href="/">
                          <i className="bi bi-twitter-x"></i>
                        </a>
                        <a href="/">
                          <i className="bi bi-facebook"></i>
                        </a>
                        <a href="/">
                          <i className="bi bi-instagram"></i>
                        </a>
                        <a href="/">
                          <i className="bi bi-linkedin"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
