import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { FaCheck } from "react-icons/fa";
import Accordion from "../components/Accordion";
import { Button, Carousel } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import FooterSection from "../components/FooterSection";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  // Accordion items
  const accordionItems = [
    {
      title: "Apa saja syarat yang dibutuhkan?",
      content: <strong>This is the first item's accordion body.</strong>,
    },
    {
      title: "Berapa hari minimal sewa mobil lepas kunci?",
      content: <strong>This is the second item's accordion body.</strong>,
    },
    {
      title: "Berapa hari sebelumnya sebaiknya booking sewa mobil?",
      content: <strong>This is the third item's accordion body.</strong>,
    },
    {
      title: "Apakah Ada biaya antar-jemput?",
      content: <strong>This is the fourth item's accordion body.</strong>,
    },
    {
      title: "Bagaimana jika terjadi kecelakaan?",
      content: <strong>This is the fifth item's accordion body.</strong>,
    },
  ];

  return (
    <>
      <div style={{ backgroundColor: "#f1f3ff" }}>
        <div id="homepage" className="homepage container-fluid">
          <div className="row">
            <div className="col-lg-6 mt-3 d-flex flex-column justify-content-center">
              <h1
                className="mb-4 ms-lg-5 me-5 ps-lg-5"
                style={{ fontSize: "36px", fontWeight: "700" }}
              >
                Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)
              </h1>
              <p className="mb-4 ms-lg-5 me-lg-5 ps-lg-5 pe-lg-5">
                Selamat datang di Binar Car Rental. Kami menyediakan mobil
                kualitas terbaik dengan harga terjangkau. Selalu siap melayani
                kebutuhanmu untuk sewa mobil selama 24 jam.
              </p>
              <div className="d-flex justify-content-start ms-lg-5 ps-lg-5">
                <Button
                  className="btn btn-primary me-4"
                  style={{
                    backgroundColor: "#5CB85F",
                    borderColor: "#5CB85F",
                  }}
                  onClick={() => {
                    navigate({ to: "/search" });
                  }}
                >
                  Mulai Sewa Mobil
                </Button>
              </div>
            </div>
            <div className="col-lg-6 mt-5 d-flex align-items-end justify-content-end">
              <img
                src="/img_car.png"
                className="img-fluid w-100 car-image align-self-end"
                alt="Mercedes"
              />
            </div>
          </div>
        </div>
      </div>

      <div id="our-services" className="our-services container mt-5">
        <div className="row">
          <div className="col-lg-6 mt-5 ms-auto d-flex align-items-center justify-content-center">
            <img
              src="/img_service.png"
              className="img-fluid service-image"
              alt="Service"
            />
          </div>
          <div className="col-lg-6 mt-3 d-flex flex-column justify-content-start">
            <p
              className="mb-4 ms-2"
              style={{ fontSize: "30px", fontWeight: "700" }}
            >
              Best Car Rental for any kind of trip in (Lokasimu)!
            </p>
            <p className="ms-2">
              Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga
              lebih murah dibandingkan yang lain, kondisi mobil baru, serta
              kualitas pelayanan terbaik untuk perjalanan wisata, bisnis,
              wedding, meeting, dll.
            </p>
            <div className="flex-container">
              <ul className="list-group" style={{ border: "none", padding: 0 }}>
                <li className="list-group-item" style={{ border: "none" }}>
                  <FaCheck className="me-2" /> Sewa Mobil Dengan Supir di Bali
                  12 Jam
                </li>
                <li className="list-group-item" style={{ border: "none" }}>
                  <FaCheck className="me-2" /> Sewa Mobil Lepas Kunci di Bali 24
                  Jam
                </li>
                <li className="list-group-item" style={{ border: "none" }}>
                  <FaCheck className="me-2" /> Sewa Mobil Jangka Panjang Bulanan
                </li>
                <li className="list-group-item" style={{ border: "none" }}>
                  <FaCheck className="me-2" /> Gratis Antar - Jemput Mobil di
                  Bandara
                </li>
                <li className="list-group-item" style={{ border: "none" }}>
                  <FaCheck className="me-2" /> Layanan Airport Transfer / Drop
                  In Out
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div id="why-us" className="why-us container mt-5 pt-lg-5">
        <div className="row">
          <div className="col-lg-6 mt-3 d-flex flex-column justify-content-start">
            <h5
              className="mb-3 mt-3"
              style={{ fontWeight: "bold", fontSize: "24px" }}
            >
              Why us?
            </h5>
            <p className="mb-4">Mengapa harus pilih Binar Car Rental?</p>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <img
                  src="/icon_thumb.png"
                  className="img-fluid thumb-image mb-3"
                  alt="Thumb"
                />
                <h5 className="card-title mb-3">Mobil Lengkap</h5>
                <p className="card-text">
                  Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan
                  terawat
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <img
                  src="/icon_price.png"
                  className="img-fluid price-image mb-3"
                  alt="Price"
                />
                <h5 className="card-title mb-3">Harga Murah</h5>
                <p className="card-text">
                  Harga murah dan bersaing, bisa bandingkan harga kami dengan
                  rental mobil lain
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <img
                  src="/icon_hours.png"
                  className="img-fluid hours-image mb-3"
                  alt="Hours"
                />
                <h5 className="card-title mb-3">Layanan 24 Jam</h5>
                <p className="card-text">
                  Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga
                  tersedia di akhir minggu
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <img
                  src="/icon_professional.png"
                  className="img-fluid professional-image mb-3"
                  alt="Professional"
                />
                <h5 className="card-title mb-3">Sopir Professional</h5>
                <p className="card-text">
                  Sopir yang profesional, berpengalaman, jujur, ramah dan selalu
                  tepat waktu
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="testimonial" className="testimonial container mt-5 pt-5 mb-5">
        <div className="col mt-3 d-flex flex-column justify-content-center align-items-center">
          <h5 className="text-center">Testimonial</h5>
          <p className="mt-2 text-center">
            Berbagai review positif dari para pelanggan kami
          </p>
        </div>
        <div
          className="testimonial container mt-5 pt-5 mb-5"
          style={{
            maxWidth: "800px",
            margin: "auto",
            backgroundColor: "#C4C9DF",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Carousel
            className="mb-4"
            style={{ width: "100%" }}
            prevIcon={
              <span
                style={{
                  color: "#000",
                  visibility: "visible",
                }}
                className="carousel-control-prev-icon"
              />
            }
            nextIcon={
              <span
                style={{
                  color: "#000",
                  visibility: "visible",
                }}
                className="carousel-control-next-icon"
              />
            }
          >
            <Carousel.Item>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  padding: "20px",
                  height: "250px", // Fixed height for each carousel item
                  overflow: "hidden",
                }}
              >
                <img
                  src="/testi1.png"
                  className="rounded-circle"
                  alt="John Dee"
                  style={{ width: "100px", height: "100px" }}
                />
                <div className="ms-3" style={{ maxWidth: "500px" }}>
                  <h5 className="mb-0">John Dee 32, Bromo</h5>
                  <div
                    className="star-rating"
                    style={{ color: "rgb(128, 128, 52)" }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p
                    style={{
                      maxHeight: "100px", // Limit paragraph height
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod.”
                  </p>
                </div>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  padding: "20px",
                  height: "250px", // Fixed height for each carousel item
                  overflow: "hidden",
                }}
              >
                <img
                  src="/testi2.jpg"
                  className="rounded-circle"
                  alt="Jane Doe"
                  style={{ width: "100px", height: "100px" }}
                />
                <div className="ms-3" style={{ maxWidth: "500px" }}>
                  <h5 className="mb-0">Jane Doe 29, Surabaya</h5>
                  <div
                    className="star-rating"
                    style={{ color: "rgb(128, 128, 52)" }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p
                    style={{
                      maxHeight: "100px", // Limit paragraph height
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor."
                  </p>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>

      <div id="start" className="start container mt-5 pt-5">
        <div
          className="text-center text-md-left"
          style={{
            backgroundColor: "#0D28A6",
            padding: "40px 0",
            borderRadius: "20px",
          }}
        >
          <h1 style={{ color: "#ffffff" }}>
            Sewa Mobil di (Lokasimu) Sekarang
          </h1>
          <p
            className="text-justify ms-5 me-5 mt-5"
            style={{ color: "#ffffff" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Button
            className="btn btn-primary me-4"
            style={{
              backgroundColor: "#5CB85F",
              borderColor: "#5CB85F",
            }}
            onClick={() => {
              navigate({ to: "/search" });
            }}
          >
            Mulai Sewa Mobil
          </Button>
        </div>
      </div>

      <div id="frequent" className="frequent container mt-5 pt-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column justify-content-start">
            <p style={{ fontSize: "24px", fontWeight: "700" }}>
              Frequently Asked Questions
            </p>
            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
          </div>
          <div className="col-md-7 d-flex flex-column justify-content-start">
            <Accordion items={accordionItems} />
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
}
