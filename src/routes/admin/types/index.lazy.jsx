import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { getType } from "../../../service/carType";
import { useQuery } from "@tanstack/react-query";
import TypeTable from "../../../components/TypeTable";
import Protected from "../../../components/Auth/Protected";
export const Route = createLazyFileRoute("/admin/types/")({
  component: () => (
    <Protected roles={[1]}>
      <Types />
    </Protected>
  ),
});

function Types() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const [car_types, setTypes] = useState([]);
  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["types"],
    queryFn: () => getType(),
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      setTypes(data);
    }
  }, [data, isSuccess]);

  if (!token) {
    navigate({ to: "/login" });
    return;
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
        <h1>Car Types List:</h1>
        {user?.role_id === 1 && (
          <Button
            className="me-2"
            style={{ width: "150px", marginLeft: "auto" }}
            onClick={() => {
              navigate({ to: "/admin/types/create" });
            }}
          >
            Create New Type
          </Button>
        )}
      </Row>

      <Row className="mt-4">
        {car_types.length === 0 ? (
          <h1>Types data is not found!</h1>
        ) : (
          <TypeTable setTypes={setTypes} car_types={car_types} />
        )}
      </Row>
    </div>
  );
}
