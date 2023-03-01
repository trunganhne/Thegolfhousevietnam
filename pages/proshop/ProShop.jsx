import { da } from "date-fns/locale";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select, { components } from "react-select";
import { Loader, RangeSlider } from "rsuite";
import Pagination from "../../components/pagination/pagination";
import { getBannerData } from "../../store/redux/Banner/banner.action";
import { getContentData } from "../../store/redux/LoadContentReducer/content.action";
import { getProshopData } from "../../store/redux/ProshopReducer/proshop.action";
import { removeAccents } from "../../utils/function";
import { usePagination } from "../../utils/usePagination";
import styles from "./ProShop.module.scss";
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: 18,
    color: state.isSelected ? "#fff" : "#000",
    cursor: "pointer",
    backgroundColor: state.isSelected ? "#00B577" : "transparent",
    zIndex: 3000,
    position: "relative",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#000",
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#000",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  valueContainer: (provided, state) => ({
    ...provided,
    paddingLeft: 0,
    paddingRight: 0,
    zIndex: 3000,
  }),
  container: (provided, state) => ({
    ...provided,
    width: 130,
    zIndex: 5000,
    "@media screen and (max-width: 576px)": {
      width: "100%",
    },
  }),
  input: (base, state) => ({
    ...base,
    color: "#000",
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: "tranparent",
    cursor: "pointer",
    color: "#000",
    "@media screen and (max-width: 480px)": {
      padding: 0,
    },
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      border: state.isFocused ? 0 : 0,
    },
  }),
};

const options = [
  { value: "1", label: "Mới nhất" },
  { value: "2", label: "Cũ nhất" },
  { value: "3", label: "Giá cao nhất" },
  { value: "4", label: "Giá thấp nhất" },
];

const price = [
  {
    value: "price1",
    label: "Dưới 1.000.000 VND",
  },
  {
    value: "price2",
    label: "1.000.000 VND - 4.999.999 VND",
  },
  {
    value: "price3",
    label: "5.000.000 VND - 10.000.000 VND",
  },
  {
    value: "price4",
    label: "Trên 10.000.000 VND",
  },
];

const color = ["red", "green", "blue", "yellow", "gray"];
const brand = [
  {
    value: "brand1",
    name: "Nike",
  },
  {
    value: "brand2",
    name: "Addidas",
  },
  {
    value: "brand3",
    name: "Hazzy",
  },
];
function ProShop(props) {
  const [value, setValue] = React.useState([0, 1]);
  const [typeFilter, setTypeFilter] = useState("");
  const [hiddenFilter, setHiddenFilter] = useState(false);
  const [showFilter1, setShowFilter1] = useState(false);
  const [showFilter2, setShowFilter2] = useState(false);
  const [showFilter3, setShowFilter3] = useState(false);
  const [showFilter4, setShowFilter4] = useState(false);
  const [showFilter5, setShowFilter5] = useState(false);
  const proshopData = useSelector((state) => state.ProshopReducer.proshopList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProshopData());
    dispatch(getBannerData());
    dispatch(getContentData());
  }, []);
  const { banners } = useSelector((state) => state.BannerReducer);
  const { contents } = useSelector((state) => state.ContentReducer);
  const bannerProshop = banners.filter((item) => item.danh_muc === "Proshop");
  const router = useRouter();
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <i
          className="fa-solid fa-chevron-down"
          style={{
            fontSize: 16,
            color: "#5F5F5F",
          }}
        ></i>
      </components.DropdownIndicator>
    );
  };
  const coast = proshopData.filter((x) =>
    x.ten_vt?.toLowerCase()?.includes("áo")
  );
  const trousers = proshopData.filter((x) =>
    x.ten_vt?.toLowerCase()?.includes("quần")
  );
  const skirt = proshopData.filter((x) =>
    x.ten_vt?.toLowerCase()?.includes("váy")
  );
  const glove = proshopData.filter(
    (x) =>
      x.ten_vt?.toLowerCase()?.includes("găng") ||
      x.ten_vt?.toLowerCase()?.includes("glove")
  );
  const shose = proshopData.filter((x) =>
    x.ten_vt?.toLowerCase()?.includes("giày")
  );
  const trangphuc = proshopData.filter((x) =>
    x.ten_vt?.toLowerCase()?.includes("trang phục")
  );
  const fullset = proshopData.filter((x) =>
    x.ten_vt?.toLowerCase()?.includes("full")
  );
  const hat = proshopData.filter((x) =>
    x.ten_vt?.toLowerCase()?.includes("nón")
  );
  const data = usePagination(proshopData, 6);
  const filter = (type) => {
    data.setCurrentPage(1);
    switch (type) {
      case "Váy": {
        data.setPerData(skirt);
        break;
      }
      case "Áo": {
        data.setPerData(coast);
        break;
      }
      case "Quần": {
        data.setPerData(trousers);
        break;
      }
      case "Găng bọc": {
        data.setPerData(gloveWrap);
        break;
      }
      case "Găng tay": {
        data.setPerData(glove);
        break;
      }
      case "Giày": {
        data.setPerData(shose);
        break;
      }
      case "Nón": {
        data.setPerData(hat);
        break;
      }
      case "Trang phục": {
        data.setPerData(trangphuc);
        break;
      }
      case "Full": {
        data.setPerData(fullset);
        break;
      }
      default: {
        data.setPerData(proshopData);
        break;
      }
    }
  };
  const handleSearchInput = (e) => {
    const value = e.target.value;
    const dataSearch = proshopData.filter((x) =>
      removeAccents(x.ten_vt)
        .toLowerCase()
        .includes(removeAccents(value).toLowerCase())
    );
    if (value !== "") {
      data.setPerData(dataSearch);
      data.setCurrentPage(1);
    } else {
      data.setPerData(proshopData);
      data.setCurrentPage(1);
    }
  };
  const sort = (value) => {
    data.setCurrentPage(1);
    switch (value) {
      case "1": {
        const Newest = [...proshopData].sort(
          (a, b) => new Date(b.date_created) - new Date(a.date_created)
        );
        data.setPerData(Newest);
        break;
      }
      case "2": {
        const lostest = [...proshopData].sort(
          (a, b) => new Date(a.date_created) - new Date(b.date_created)
        );
        data.setPerData(lostest);
        break;
      }
      case "3": {
        const Newest = [...proshopData].sort(
          (a, b) => b.gia_ban_le - a.gia_ban_le
        );
        data.setPerData(Newest);
        break;
      }
      case "4": {
        const price = [...proshopData].sort(
          (a, b) => a.gia_ban_le - b.gia_ban_le
        );
        data.setPerData(price);
        break;
      }
      default:
        break;
    }
  };
  const sectiontitle = contents.filter(
    (item) => item.category === "63bc4b5739d2a23b06d91f9e"
  );
  const filterPrice = (e) => {
    const { value } = e.target;
    data.setCurrentPage(1);
    switch (value) {
      case "price1": {
        const Newest = proshopData.filter((x) => x.gia_ban_le < 1000000);
        data.setPerData(Newest);
        break;
      }
      case "price2": {
        const Newest = proshopData.filter(
          (x) => x.gia_ban_le >= 1000000 && x.gia_ban_le < 4999999
        );
        data.setPerData(Newest);
        break;
      }
      case "price3": {
        const Newest = proshopData.filter(
          (x) => x.gia_ban_le >= 5000000 && x.gia_ban_le < 9999999
        );
        data.setPerData(Newest);
        break;
      }
      case "price4": {
        const Newest = proshopData.filter((x) => x.gia_ban_le >= 10000000);
        data.setPerData(Newest);
        break;
      }
      case "gen1": {
        const Newest = proshopData.filter((x) =>
          x.ten_vt?.toLowerCase()?.includes("nam")
        );
        data.setPerData(Newest);
        break;
      }
      case "gen2": {
        const Newest = proshopData.filter((x) =>
          x.ten_vt?.toLowerCase()?.includes("nữ")
        );
        data.setPerData(Newest);
        break;
      }
      case "brand1": {
        const Newest = proshopData.filter((x) =>
          x.ten_vt?.toLowerCase()?.includes("nike")
        );
        data.setPerData(Newest);
        break;
      }
      case "brand2": {
        const Newest = proshopData.filter((x) =>
          x.ten_vt?.toLowerCase()?.includes("addidas")
        );
        data.setPerData(Newest);
        break;
      }
      case "brand3": {
        const Newest = proshopData.filter((x) =>
          x.ten_vt?.toLowerCase()?.includes("hazzy")
        );
        data.setPerData(Newest);
        break;
      }
      default:
        break;
    }
  };
  const [arr, setArr] = useState();
  const pictureArray = (data) => {
    let arr = [];
    if (data?.picture) {
      arr.push({
        id: 1,
        url: data.picture,
      });
    }
    if (data?.picture2) {
      arr.push({
        id: 2,
        url: data.picture2,
      });
    }
    if (data?.picture3) {
      arr.push({
        id: 3,
        url: data.picture3,
      });
    }
    if (data?.picture4) {
      arr.push({
        id: 4,
        url: data.picture4,
      });
    }
    return arr;
  };
  const [showInfo2, setShowInfo2] = useState(-1);
  const [url, setUrl] = useState();
  return (
    <div className={styles.proshop_page}>
      <div className="container" data-aos="fade-down">
        <div className="heading">
          <h2>{sectiontitle[0]?.title}</h2>
        </div>
      </div>
      <div className={styles.bannerv2} data-aos="fade-right">
        <Image
          loader={({ src }) =>
            `https://api.fostech.vn${src}?access_token=7d7fea98483f31af4ac3cdd9db2e4a93`
          }
          alt="Image 1"
          src={bannerProshop[0]?.hinh_anh}
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.bannerv2_content}>
          <div className="container h-100">
            <div className="d-flex h-100 justify-content-end align-items-center flex-column">
              {/* <div onClick={() => router.push(bannerProshop[0]?.link)}>
                <button className="btn-content">
                  {bannerProshop[0]?.action}
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div
          className={
            "d-flex flex-wrap align-items-start" + " " + styles.content
          }
          id="pro-shop"
        >
          <div
            className={"col-12 col-lg-3" + " " + styles.left}
            // data-aos="fade-right"
            style={{
              display: hiddenFilter && "none",
            }}
          >
            <div className={styles.tabs}>
              <div className={"d-flex flex-wrap" + " " + styles.top}>
                <span>Tổng cộng ({data.perData.length})</span>
              </div>
              <div className={"d-flex flex-wrap" + " " + styles.center}>
                <div className="col-12 col-lg-12 col-md-6">
                  {/* <h5>Loại sản phẩm</h5> */}
                  <ul>
                    <li onClick={() => filter("Full")}>
                      Full set ({fullset.length})
                    </li>
                    <li onClick={() => filter("Áo")}>Áo ({coast.length})</li>
                    <li onClick={() => filter("Quần")}>
                      Quần ({trousers.length})
                    </li>
                    <li onClick={() => filter("Váy")}>Váy ({skirt.length})</li>
                    <li onClick={() => filter("Giày")}>
                      Giày ({shose.length})
                    </li>
                    <li onClick={() => filter("Găng")}>
                      Găng ({glove.length})
                    </li>
                    <li onClick={() => filter("Bóng")}>Nón ({hat.length})</li>
                    <li onClick={() => filter("Trang phục")}>
                      Trang phục ({trangphuc.length})
                    </li>
                  </ul>
                </div>
                <div className={styles.wrap}>
                  <div
                    className={
                      "col-12 col-lg-12 col-md-6" + " " + styles.center_item
                    }
                  >
                    <h5
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() => setShowFilter1(!showFilter1)}
                    >
                      Giới tính
                      {showFilter1 ? (
                        <i className="fa-light fa-chevron-up"></i>
                      ) : (
                        <i className="fa-light fa-chevron-down"></i>
                      )}
                    </h5>
                    {showFilter1 && (
                      <div
                        className={
                          styles.item_content + " " + "d-flex flex-column"
                        }
                      >
                        <label htmlFor="gen1">
                          <input
                            type="radio"
                            id="gen1"
                            value="gen1"
                            name="gen"
                            onChange={(e) => filterPrice(e)}
                          />{" "}
                          Nam
                        </label>
                        <label htmlFor="gen2">
                          <input
                            type="radio"
                            id="gen2"
                            value="gen2"
                            name="gen"
                            onChange={(e) => filterPrice(e)}
                          />
                          Nữ
                        </label>
                        {/* <label htmlFor="gen3">
                          <input type="radio" id="gen3" name="gen" /> Unisex
                        </label> */}
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      "col-12 col-lg-12 col-md-6" + " " + styles.center_item
                    }
                  >
                    <h5
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() => setShowFilter2(!showFilter2)}
                    >
                      Trẻ em
                      {showFilter2 ? (
                        <i className="fa-light fa-chevron-up"></i>
                      ) : (
                        <i className="fa-light fa-chevron-down"></i>
                      )}
                    </h5>
                    {showFilter2 && (
                      <div
                        className={
                          styles.item_content + " " + "d-flex flex-column"
                        }
                      >
                        <label htmlFor="kid1">
                          <input type="radio" id="kid1" name="kid" /> Nam
                        </label>
                        <label htmlFor="kid2">
                          <input type="radio" id="kid2" name="kid" /> Nữ
                        </label>
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      "col-12 col-lg-12 col-md-6" + " " + styles.center_item
                    }
                  >
                    <h5
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() => setShowFilter3(!showFilter3)}
                    >
                      Giá
                      {showFilter3 ? (
                        <i className="fa-light fa-chevron-up"></i>
                      ) : (
                        <i className="fa-light fa-chevron-down"></i>
                      )}
                    </h5>
                    {showFilter3 && (
                      <div
                        className={
                          styles.item_content + " " + "d-flex flex-column"
                        }
                      >
                        {price.map((item, index) => (
                          <label htmlFor={item.value} key={index}>
                            <input
                              type="radio"
                              name="price"
                              id={item.value}
                              value={item.value}
                              onChange={(e) => filterPrice(e)}
                            />{" "}
                            {item.label}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      "col-12 col-lg-12 col-md-6" + " " + styles.center_item
                    }
                  >
                    <h5
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() => setShowFilter4(!showFilter4)}
                    >
                      Màu sắc
                      {showFilter4 ? (
                        <i className="fa-light fa-chevron-up"></i>
                      ) : (
                        <i className="fa-light fa-chevron-down"></i>
                      )}
                    </h5>
                    {showFilter4 && (
                      <div
                        className={
                          styles.item_content + " " + "d-flex flex-column"
                        }
                      >
                        <div className="d-flex flex-wrap">
                          {color.map((i) => (
                            <div
                              key={i}
                              className={
                                "d-flex flex-column align-items-center col-4" +
                                " " +
                                styles.color_item
                              }
                            >
                              <div
                                className={styles.color}
                                style={{
                                  width: 20,
                                  height: 20,
                                  backgroundColor: i,
                                }}
                              ></div>
                              <span>{i}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      "col-12 col-lg-12 col-md-6" + " " + styles.center_item
                    }
                  >
                    <h5
                      className="w-100 d-flex justify-content-between align-items-center"
                      onClick={() => setShowFilter5(!showFilter5)}
                    >
                      Thương hiệu
                      {showFilter5 ? (
                        <i className="fa-light fa-chevron-up"></i>
                      ) : (
                        <i className="fa-light fa-chevron-down"></i>
                      )}
                    </h5>
                    {showFilter5 && (
                      <div
                        className={
                          styles.item_content + " " + "d-flex flex-column"
                        }
                      >
                        {brand.map((it, id) => (
                          <label htmlFor={it.value} key={id}>
                            <input
                              type="radio"
                              id={it.value}
                              name="brand"
                              value={it.value}
                              onChange={(e) => filterPrice(e)}
                            />
                            {it.name}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              hiddenFilter ? "col-12" : "col-12 col-lg-9" + " " + styles.right
            }
            // data-aos="fade-right"
          >
            <div
              className={
                "d-flex flex-wrap justify-content-between align-items-center" +
                " " +
                styles.header
              }
            >
              <span className="col-12 col-sm-6">
                {/* Hiển thị {data.currentDatas.length} trên {data.perData.length}{" "}
                kết quả */}
              </span>
              <div
                className="col-12 col-sm-6 d-flex align-items-center justify-content-start justify-content-sm-end"
                data-aos="fade-left"
              >
                <span
                  className={styles.hiddenFilter}
                  onClick={() => setHiddenFilter(!hiddenFilter)}
                >
                  {hiddenFilter ? "Hiện bộ lọc" : "Ẩn bộ lọc"}
                  <i className="fa-sharp fa-solid fa-shuffle"></i>
                </span>
                <Select
                  options={options}
                  styles={customStyles}
                  onChange={({ value }) => sort(value)}
                  defaultValue={options[0]}
                  components={{ DropdownIndicator }}
                />
              </div>
            </div>
            <div className={"d-flex flex-wrap" + " " + styles.product}>
              {proshopData.length <= 0 ? (
                <div className="d-flex m-auto">
                  <Loader size="md" content="Đang tải dữ liệu..." />
                </div>
              ) : (
                data.currentDatas.map((item, index) => (
                  <div
                    key={index}
                    className={"col-12 col-sm-6 col-lg-4" + " " + styles.item}
                    onMouseEnter={() => {
                      setShowInfo2(index);
                    }}
                    onMouseLeave={() => {
                      setShowInfo2(-1);
                      setUrl();
                      pictureArray({});
                    }}
                  >
                    <div className={styles.info + " " + "d-flex flex-column"}>
                      {showInfo2 === index ? (
                        <>
                          <div
                            className={styles.image}
                            style={{ zIndex: 1006, position: "relative" }}
                            onClick={() =>
                              router.push(
                                `/proshop/${removeAccents(item.ten_vt)}`
                              )
                            }
                          >
                            {url ? (
                              <Image
                                alt={"Image" + index + 1}
                                src={url}
                                loader={({ src }) =>
                                  `https://api.fostech.vn${src}?access_token=7d7fea98483f31af4ac3cdd9db2e4a93`
                                }
                                width={300}
                                height={300}
                                objectFit={"cover"}
                              ></Image>
                            ) : (
                              <Image
                                alt={"Image" + index + 1}
                                loader={({ src }) =>
                                  `https://api.fostech.vn${src}?access_token=7d7fea98483f31af4ac3cdd9db2e4a93`
                                }
                                src={item.picture}
                                width={300}
                                height={300}
                                objectFit={"cover"}
                              ></Image>
                            )}
                          </div>
                          <div className="d-flex">
                            {pictureArray(item)?.map((it, ind) => (
                              <div
                                key={ind}
                                className={styles.tool_img}
                                onClick={() => setUrl(it.url)}
                              >
                                <Image
                                  alt={"Image2"}
                                  loader={({ src }) =>
                                    `https://api.fostech.vn${src}?access_token=7d7fea98483f31af4ac3cdd9db2e4a93`
                                  }
                                  src={it.url}
                                  layout="fill"
                                  objectFit={"cover"}
                                ></Image>
                              </div>
                            ))}
                          </div>
                          <div
                            onClick={() =>
                              router.push(
                                `/proshop/${removeAccents(item.ten_vt)}`
                              )
                            }
                          >
                            <p>{item.gia_ban_le.toLocaleString("vi-VI")} VND</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className={styles.image}
                            style={{ zIndex: 1003 }}
                            onClick={() =>
                              router.push(
                                `/proshop/${removeAccents(item.ten_vt)}`
                              )
                            }
                          >
                            <Image
                              alt={"Image" + index + 1}
                              loader={({ src }) =>
                                `https://api.fostech.vn${src}?access_token=7d7fea98483f31af4ac3cdd9db2e4a93`
                              }
                              src={item.picture}
                              width={300}
                              height={300}
                              objectFit={"cover"}
                            ></Image>
                          </div>
                          <div
                            onClick={() =>
                              router.push(
                                `/proshop/${removeAccents(item.ten_vt)}`
                              )
                            }
                          >
                            <h5>{item.ten_vt}</h5>
                            <p>{item.gia_ban_le.toLocaleString("vi-VI")} VND</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="d-flex justify-content-center">
              <Pagination data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProShop;
