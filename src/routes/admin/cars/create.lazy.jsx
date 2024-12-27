import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { toast } from "react-toastify";
import { getModels } from "../../../service/models";
import { createCars } from "../../../service/cars";
import { useMutation, useQuery } from "@tanstack/react-query";
import Protected from "../../../components/Auth/Protected";
import { useSelector } from "react-redux";

// Rute untuk halaman CreateCars
export const Route = createLazyFileRoute("/admin/cars/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreateCars />
    </Protected>
  ),
});

// Komponen untuk membuat mobil baru
function CreateCars() {
  const navigate = useNavigate();

  // State untuk input form
  const [plate, setPlate] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [year, setYear] = useState("");
  const [availableAt, setAvailableAt] = useState("");
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [modelsId, setModelsId] = useState(0);
  const { token } = useSelector((state) => state.auth);
  // Mengambil data model mobil menggunakan useQuery
  const {
    data: models,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["models"], // Updated queryKey
    queryFn: () => getModels(), // Updated queryFn
    enabled: !!token, // only run query if there's an id
  });

  // Mutasi untuk membuat mobil baru
  const { mutate: createCar, isLoading: isCreating } = useMutation({
    mutationFn: createCars,
    onSuccess: () => {
      toast.success("Car created successfully!");
      navigate({ to: "/admin/cars" });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create car");
    },
  });

  // Menangani pengiriman form
  const onSubmit = async (event) => {
    event.preventDefault();

    // Validasi input
    if (!modelsId || !rentPerDay || !year || !plate || !availableAt) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (rentPerDay <= 0) {
      toast.error("Rent Per Day harus lebih dari 0");
      return;
    }

    const platePattern = /^[A-Z]{3}-\d{4}$/;
    if (!platePattern.test(plate)) {
      toast.error("Plate must be in the format 'ABC-1234'");
      return;
    }

    if (year <= 1886) {
      toast.error("Year must be more than 1886");
      return;
    }

    // Membuat request untuk membuat mobil
    const request = {
      plate,
      rentPerDay: parseInt(rentPerDay, 10),
      year: parseInt(year, 10),
      availableAt,
      available,
      carsmodels_id: modelsId,
      image: image ? image : null,
    };

    // Menjalankan mutasi untuk membuat mobil
    createCar(request);
  };

  // Loading dan Error handling untuk query models
  if (isLoading) {
    return <div>Loading Cars...</div>;
  }

  if (isError) {
    return <div>Error fetching Carss</div>;
  }

  return (
    <>
      <Row className="ms-2 mb-3 mt-4 align-items-center">
        <Button
          variant="outline-primary"
          style={{
            width: "150px",
            marginRight: "auto",
          }}
          onClick={() => {
            navigate({ to: "/admin/cars" });
          }}
        >
          Back
        </Button>
      </Row>

      <Row className="mt-5">
        <Col className="offset-md-3">
          <Card>
            <Card.Header className="text-center">Create Car</Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                {/* Plate Field */}
                <Form.Group as={Row} className="mb-3" controlId="plate">
                  <Form.Label column sm={3}>
                    Plate
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Plate (e.g., ABC-1234)"
                      required
                      value={plate}
                      onChange={(event) => setPlate(event.target.value)}
                    />
                  </Col>
                </Form.Group>

                {/* Car Model */}
                <Form.Group as={Row} className="mb-3" controlId="model">
                  <Form.Label column sm={3}>
                    Car Model
                  </Form.Label>
                  <Col sm="9">
                    <Form.Select
                      onChange={(event) =>
                        setModelsId(Number(event.target.value))
                      }
                      required
                    >
                      <option disabled selected value="">
                        Select Car Model
                      </option>
                      {isSuccess &&
                        models &&
                        models.map((model) => (
                          <option key={model.id} value={model.id}>
                            {model.model_name}
                          </option>
                        ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* Available Field */}
                <Form.Group as={Row} className="mb-3" controlId="available">
                  <Form.Label column sm={3}>
                    Available
                  </Form.Label>
                  <Col sm="9">
                    <Form.Select
                      value={available ? "true" : "false"}
                      onChange={(event) =>
                        setAvailable(event.target.value === "true")
                      }
                      required
                    >
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* Rent per Day Field */}
                <Form.Group as={Row} className="mb-3" controlId="rentPerDay">
                  <Form.Label column sm={3}>
                    Rent per Day
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="number"
                      placeholder="Rent per Day"
                      required
                      value={rentPerDay}
                      onChange={(event) => setRentPerDay(event.target.value)}
                    />
                  </Col>
                </Form.Group>

                {/* Year Field */}
                <Form.Group as={Row} className="mb-3" controlId="year">
                  <Form.Label column sm={3}>
                    Year
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="number"
                      placeholder="Year"
                      required
                      value={year}
                      onChange={(event) => setYear(event.target.value)}
                    />
                  </Col>
                </Form.Group>

                {/* Available At Field */}
                <Form.Group as={Row} className="mb-3" controlId="availableAt">
                  <Form.Label column sm={3}>
                    Available At
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="date"
                      required
                      value={availableAt}
                      onChange={(event) => setAvailableAt(event.target.value)}
                    />
                  </Col>
                </Form.Group>

                {/* Car Image Field */}
                <Form.Group as={Row} className="mb-3" controlId="image">
                  <Form.Label column sm={3}>
                    Car Image
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="file"
                      onChange={(event) => {
                        setImage(event.target.files[0]);
                        setCurrentImage(
                          URL.createObjectURL(event.target.files[0])
                        );
                      }}
                      accept=".jpg,.png"
                    />
                  </Col>
                </Form.Group>

                {/* Display Image Preview */}
                {currentImage && (
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}></Form.Label>
                    <Col sm={9}>
                      <Image src={currentImage} fluid />
                    </Col>
                  </Form.Group>
                )}

                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary" disabled={isCreating}>
                    {isCreating ? "Creating..." : "Create Car"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </>
  );
}

export default CreateCars;
