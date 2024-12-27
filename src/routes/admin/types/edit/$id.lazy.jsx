import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getTypeById, updateType } from "../../../../service/carType";
import { toast } from "react-toastify";
import Protected from "../../../../components/Auth/Protected";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/types/edit/$id")({
  component: () => (
    <Protected roles={[1]}>
      <EditTypes />
    </Protected>
  ),
});

function EditTypes() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const [body_style, setBodyStyle] = useState("");
  const [capacity, setCapacity] = useState("");
  const [fuel_type, setFuelType] = useState("");
  const { token } = useSelector((state) => state.auth);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["types", id],
    queryFn: () => getTypeById(id),
    enabled: !!token,
    retry: 0,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setBodyStyle(data.body_style || "");
      setCapacity(data.capacity || "");
      setFuelType(data.fuel_type || "");
    }
  }, [data, isSuccess]);

  const { mutate: editCarType } = useMutation({
    mutationFn: (body) => {
      return updateType(id, body);
    },
    onSuccess: () => {
      toast.success("Type edited successfully!");
      navigate({ to: "/admin/types" });
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(body_style);
    if (capacity <= 0) {
      toast.error("Capacity harus lebih dari 0");
      return;
    }

    const result = {
      body_style: body_style,
      capacity: capacity,
      fuel_type: fuel_type,
    };

    editCarType(result);
  };

  // Handling loading state
  if (isLoading) {
    return <div>Loading...</div>; // You can return a loading spinner or placeholder here
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
            navigate({ to: "/admin/types" });
          }}
        >
          Back
        </Button>
      </Row>

      <Row className="mt-5">
        <Col className="offset-md-3">
          <Card>
            <Card.Header className="text-center">Edit Type</Card.Header>
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
                    Update Type
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
