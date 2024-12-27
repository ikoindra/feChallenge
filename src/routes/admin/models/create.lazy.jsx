import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getType } from "../../../service/carType";
import { createModels } from "../../../service/models";
import Protected from "../../../components/Auth/Protected";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/admin/models/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreateModel />
    </Protected>
  ),
});

function CreateModel() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [modelName, setModelName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [transmission, setTransmission] = useState("");
  const [description, setDescription] = useState("");
  const [specs, setSpecs] = useState([""]);
  const [options, setOptions] = useState([""]);
  const [type_id, setTypeId] = useState(0);

  const {
    data: type,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: ["type"],
    queryFn: getType,
    enabled: !!token,
  });

  const { mutate: createCarModels } = useMutation({
    mutationFn: (body) => {
      return createModels(body);
    },
    onSuccess: () => {
      toast.success("Type created successfully!");
      navigate({ to: "/admin/models" });
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });
  // Add new empty spec and option
  const addSpecValue = () => setSpecs([...specs, ""]);
  const addOptionValue = () => setOptions([...options, ""]);

  // Remove spec or option by index
  const removeSpecValue = (index) => {
    const updatedSpecs = specs.filter((_, i) => i !== index);
    setSpecs(updatedSpecs);
  };

  const removeOptionValue = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  // Update value in specs or options
  const handleSpecChange = (index, event) => {
    const updatedSpecs = [...specs];
    updatedSpecs[index] = event.target.value;
    setSpecs(updatedSpecs);
  };

  const handleOptionChange = (index, event) => {
    const updatedOptions = [...options];
    updatedOptions[index] = event.target.value;
    setOptions(updatedOptions);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    //Check if already + put at least 1 specs and options
    if (specs.length === 0 && options.length === 0) {
      toast.error("Please select a spec and options");
      return;
    }
    // Check if there are empty fields in specs or options
    if (specs.some((spec) => !spec) || options.some((option) => !option)) {
      toast.error("Please fill all specifications and options.");
      return;
    }

    const result = {
      model_name: modelName,
      manufacturer: manufacturer,
      transmission: transmission,
      type_id: type_id,
      description: description,
      specs: specs,
      options: options,
    };

    createCarModels(result);
  };

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
            navigate({ to: "/admin/models" });
          }}
        >
          Back
        </Button>
      </Row>

      <Row className=" d-flex align-items-center mb-3">
        <Col Col md={8} lg={6} className="ms-auto me-auto">
          <Card>
            <Card.Header className="text-center">Create Model</Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="model_name">
                  <Form.Label column sm={3}>
                    Model Name
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Model Name"
                      required
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="manufacturer">
                  <Form.Label column sm={3}>
                    Manufacturer
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Manufacturer"
                      required
                      value={manufacturer}
                      onChange={(e) => setManufacturer(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="transmission">
                  <Form.Label column sm={3}>
                    Transmission
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Transmission"
                      required
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="type">
                  <Form.Label column sm={3}>
                    Type
                  </Form.Label>
                  <Col sm="9">
                    <Form.Select
                      aria-label="Select Type"
                      required
                      onChange={(e) => setTypeId(Number(e.target.value))}
                    >
                      <option disabled selected value="">
                        Select Type
                      </option>
                      {isPending && <option>Loading types...</option>}
                      {isSuccess &&
                        type &&
                        type.map((t) => (
                          <option key={t?.id} value={t?.id}>
                            {t?.body_style} ({t?.id})
                          </option>
                        ))}
                      {!isPending && !isSuccess && (
                        <option disabled>Failed to load types</option>
                      )}
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="description">
                  <Form.Label column sm={3}>
                    Description
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      as="textarea"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Specifications</Form.Label>
                  {specs.map((value, index) => (
                    <Row key={index} className="mb-2">
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          placeholder="Spec Value"
                          value={value}
                          onChange={(e) => handleSpecChange(index, e)}
                        />
                      </Col>
                      <Col sm="4">
                        <Button
                          variant="danger"
                          onClick={() => removeSpecValue(index)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button variant="secondary" onClick={addSpecValue}>
                    + Add Spec
                  </Button>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Options</Form.Label>
                  {options.map((value, index) => (
                    <Row key={index} className="mb-2">
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          placeholder="Option Value"
                          value={value}
                          onChange={(e) => handleOptionChange(index, e)}
                        />
                      </Col>
                      <Col sm="4">
                        <Button
                          variant="danger"
                          onClick={() => removeOptionValue(index)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button variant="secondary" onClick={addOptionValue}>
                    + Add Option
                  </Button>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary">
                    Create Model
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CreateModel;
