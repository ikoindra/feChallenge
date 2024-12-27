import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createType } from "../../../service/carType";
import { toast } from "react-toastify";
import Protected from "../../../components/Auth/Protected";
import { useMutation } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/types/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreateTypes />
    </Protected>
  ),
});

function CreateTypes() {
  const [body_style, setBodyStyle] = useState("");
  const [capacity, setCapacity] = useState("");
  const [fuel_type, setFuelType] = useState("");
  const navigate = useNavigate();
  const { mutate: createCarType } = useMutation({
    mutationFn: (body) => {
      return createType(body);
    },
    onSuccess: () => {
      toast.success("Type created successfully!");
      navigate({ to: "/admin/types" });
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });
  const onSubmit = async (event) => {
    event.preventDefault();

    if (capacity <= 0) {
      toast.error("Capacity harus lebih dari 0");
      return;
    }

    if (capacity <= 0) {
      toast.error("Capacity harus lebih dari 0");
      return;
    }

    // Call createStudent function with form data
    const result = {
      body_style: body_style,
      capacity: capacity,
      fuel_type: fuel_type,
    };

    createCarType(result);
  };

  return (
    <>
      <Row className="mt-4 align-items-center">
        <Button
          variant="outline-primary"
          style={{
            width: "150px",
            marginRight: "auto",
          }}
          onClick={() => {
            navigate({ to: "/admin/types" });
          }}
        >
          Back
        </Button>
      </Row>

      <Row className="mt-5">
        <Col className="offset-md-3">
          <Card>
            <Card.Header className="text-center">Create Types</Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="body_style">
                  <Form.Label column sm={3}>
                    Body Style
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Body Style"
                      required
                      value={body_style}
                      onChange={(event) => {
                        setBodyStyle(event.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="capacity">
                  <Form.Label column sm={3}>
                    Capacity
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="number"
                      placeholder="Capacity"
                      required
                      value={capacity}
                      onChange={(event) => {
                        setCapacity(event.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="fuel_type">
                  <Form.Label column sm={3}>
                    Fuel Type
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Fuel Type"
                      required
                      value={fuel_type}
                      onChange={(event) => {
                        setFuelType(event.target.value);
                      }}
                    />
                  </Col>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary">
                    Create Type
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
