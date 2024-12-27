import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { getCars } from "../../../service/cars";
import CarCard from "../../../components/CarCard";
import { useQuery } from "@tanstack/react-query";
import Protected from "../../../components/Auth/Protected";
export const Route = createLazyFileRoute("/admin/cars/")({
  component: () => (
    <Protected roles={[1]}>
      <CarsIndex />
    </Protected>
  ),
});

function CarsIndex() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const [cars, setCars] = useState([]); // Initialize as empty array
  const navigate = useNavigate();

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["cars"],
    queryFn: () => getCars(),
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      setCars(data || []); // Ensure data is an array, default to empty if null
    }
  }, [data, isSuccess]);

  if (!token) {
    navigate({ to: "/login" });
    return null;
  }

  if (isPending) {
    return (
      <Row className="mt-4">
        <h1>Loading...</h1>
      </Row>
    );
  }

  return (
    <div>
      <Row className="mt-4 align-items-center">
        <h1>Cars List:</h1>
        {user?.role_id === 1 && (
          <Button
            className="me-2"
            style={{ width: "150px", marginLeft: "auto" }}
            onClick={() => {
              navigate({ to: "/admin/cars/create" });
            }}
          >
            Create New Car
          </Button>
        )}
      </Row>

      <Row className="mt-4">
        {cars.length === 0 ? (
          <h1>Cars not found!</h1>
        ) : (
          cars.map((car) => (
            <Col md={4} lg={3} key={car.id} className="ms-3 ms-lg-0">
              <CarCard setCars={setCars} cars={car} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}
