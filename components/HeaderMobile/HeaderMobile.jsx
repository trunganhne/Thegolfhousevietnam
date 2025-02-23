import $ from "jquery";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "rsuite";
import Swal from "sweetalert2";
import { getLocalStorage, LOCAL_STORAGE } from "../../utils/handleStorage";
export default function HeaderMoblie({
  onSelect,
  activeKey,
  handleShowCart,
  handleShowSearch,
  visible,
  cart,
  ...props
}) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  useEffect(() => {
    $(".rs-navbar-item").each(function (index) {
      $(".rs-navbar-item").on("click", function () {
        $(".sub-child").attr("data-aos", "fade-left");
      });
    });
  }, []);
  useEffect(() => {
    $(".close").on("click", () => {
      $(".custom-menu").css({
        transform: "scaleY(0)",
      });
    });
  }, []);
  return (
    <div id="navbar-mobile">
      <Navbar
        {...props}
        className="custom-nav"
        style={
          visible
            ? {
                position: "fixed",
                background: "#fff",
                transition: "all 0.5s",
                boxShadow: "0px 3px 11px rgba(0, 0, 0, 0.25)",
              }
            : {}
        }
      >
        <div className="h-100">
          <Nav onSelect={onSelect} activeKey={activeKey}>
            <Navbar.Brand
              onClick={(e) => {
                e.preventDefault();
                router.push("/");
              }}
            >
              <Image
                alt="logo"
                src="/images/Logo/Logo12.png"
                width={104}
                height={95}
              />
            </Navbar.Brand>
            <div className="d-flex align-items-center">
              <div className="right d-flex">
                <Nav.Item eventKey="1" onClick={handleShowCart}>
                  <div className="cart">
                    <i className="fa-light fa-bag-shopping"></i>
                    <span className="d-flex justify-content-center align-items-center">
                      {cart.length}
                    </span>
                  </div>
                </Nav.Item>
                {/* <Nav.Item eventKey="2" className="search">
                  <i className="fa-light fa-magnifying-glass"></i>
                </Nav.Item> */}
                <Nav.Item eventKey="3" className="bar">
                  <i className="fa-regular fa-bars"></i>
                </Nav.Item>
              </div>
            </div>
          </Nav>
        </div>
      </Navbar>
      <Navbar
        {...props}
        className="custom-menu"
        data-aos="fade-down"
        data-aos-delay="200"
        style={{ transform: "scaleY(0)" }}
      >
        <Nav onSelect={onSelect} activeKey={activeKey}>
          <div className="tool">
            <Navbar.Brand
              onClick={(e) => {
                e.preventDefault();
                router.push("/");
              }}
            >
              <Image
                alt="logo"
                src="/images/Logo/Logo12.png"
                width={104}
                height={95}
              />
            </Navbar.Brand>
            <Nav.Item
              eventKey="4"
              className="close"
              onClick={(e) => {
                e.preventDefault();
                setShow(false);
              }}
            >
              <span>Close</span>
              <i className="fa-regular fa-times"></i>
            </Nav.Item>
          </div>
          <div className="scroll">
            <div className="menu-link d-flex">
              <Nav.Item
                eventKey="5"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                }}
              >
                Trang chủ
              </Nav.Item>
              <Nav.Menu title="Về Chúng Tôi">
                <Nav.Item
                  eventKey="6"
                  onClick={() => {
                    router.push("/about-us#founder");
                  }}
                >
                  Nhà sáng lập
                </Nav.Item>
                <Nav.Item
                  eventKey="7"
                  onClick={() => {
                    router.push("/about-us#about");
                  }}
                >
                  Lio Holding
                </Nav.Item>
                <Nav.Item
                  eventKey="8"
                  onClick={() => {
                    router.push("/news-events");
                  }}
                >
                  Tin tức, sự kiện
                </Nav.Item>
              </Nav.Menu>
              <Nav.Menu title="Học Viện">
                <Nav.Item
                  eventKey="9"
                  onClick={(e) => {
                    router.push("/academy");
                  }}
                >
                  Học viện
                </Nav.Item>
                <Nav.Item
                  eventKey="10"
                  onClick={(e) => {
                    router.push("/trainer");
                  }}
                >
                  Huấn Luyện Viên
                </Nav.Item>
                <Nav.Item
                  eventKey="11"
                  onClick={() => {
                    router.push("/training");
                  }}
                >
                  Đào tạo
                </Nav.Item>
              </Nav.Menu>
              <Nav.Item
                eventKey="12"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/proshop");
                }}
              >
                Proshop
              </Nav.Item>
              <Nav.Item
                eventKey="13"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/spa");
                }}
              >
                spa
              </Nav.Item>
              <Nav.Item
                eventKey="14"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/lounge");
                }}
              >
                lounge
              </Nav.Item>
              <Nav.Item
                eventKey="15"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/contact-us");
                }}
              >
                Liên hệ
              </Nav.Item>
            </div>
          </div>
          <div className="d-flex social justify-content-center">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-instagram"></i>
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}
