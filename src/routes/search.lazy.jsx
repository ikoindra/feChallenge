import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { getCarsSearched } from "../service/cars";
import SearchCard from "../components/SearchCard";
import FooterSection from "../components/FooterSection";

export const Route = createLazyFileRoute("/search")({
  component: CariMobil,
});

function CariMobil() {
  const [capacity, setCapacity] = useState("");
  const [availableAt, setAvailableAt] = useState("");

  const {
    data: cars,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["searchCars"],
    queryFn: () => {
      console.log("Sending params to backend:", { capacity, availableAt });
      return getCarsSearched(capacity, availableAt);
    },
    enabled: false,
  });

  const handleSearch = () => {
    refetch();
  };

  return (
    <>
      <div style={{ backgroundColor: "#f1f3ff" }}>
        <Container fluid id="homepage">
          <Row>
            <Col
              lg={6}
              className="mt-3 d-flex flex-column justify-content-center"
            >
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
              <div className="d-flex justify-content-start ms-lg-5 ps-lg-5 py-3"></div>
            </Col>
            <Col
              lg={6}
              className="mt-5 d-flex align-items-end justify-content-end"
            >
              <img
                src="/img_car.png"
                className="img-fluid w-100 car-image align-self-end"
                alt="Mercedes"
              />
            </Col>
          </Row>
        </Container>
      </div>

      <div
        id="search-container"
        className="container search-container mt-4 px-3"
        style={{
          width: "50%",
          margin: "0 auto",
          position: "relative",
          top: "-80px",
          zIndex: 1,
          backgroundColor: "#fff",
          padding: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "5px",
        }}
      >
        <span>
          <b>Pencariannmu</b>
        </span>
        <Row className="justify-content-center mt-2">
          <Col lg={4} md={6} className="mb-3">
            <Form.Group controlId="date-select">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control
                type="date"
                value={availableAt}
                onChange={(e) => setAvailableAt(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Form.Group controlId="capacity-select">
              <Form.Label>Jumlah Penumpang</Form.Label>
              <Form.Select
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              >
                <option value="" disabled hidden>
                  Jumlah Penumpang
                </option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col
            lg={2}
            md={6}
            className="mb-3 mt-4 d-flex align-items-end justify-content-center"
          >
            <Button
              className="btn"
              id="search-btn"
              type="button"
              style={{
                backgroundColor: "#5cb85f",
                borderColor: "#5cb85f",
                height: "38px",
              }}
              onClick={handleSearch}
              disabled={!capacity || !availableAt}
            >
              Cari Mobil
            </Button>
          </Col>
        </Row>
      </div>

      <Container className="mt-4">
        <Row className="g-5" id="cars-content">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <h1 className="text-center w-100">No cars available</h1>
          ) : (
            cars?.map((car) => <SearchCard key={car.id} cars={car} />)
          )}
        </Row>
      </Container>

      <FooterSection />
    </>
  );
}
