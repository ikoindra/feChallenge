export const getType = async () => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/type`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result?.data;
};

export const getTypeById = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/type/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result?.data;
};

export const createType = async (request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("body_style", request.body_style);
  formData.append("capacity", request.capacity);
  formData.append("fuel_type", request.fuel_type);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/type`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  return result?.data;
};

export const updateType = async (id, request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("body_style", request.body_style);
  formData.append("capacity", request.capacity);
  formData.append("fuel_type", request.fuel_type);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/type/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: formData,
  });

  const result = await response.json();
  if (!result?.success) {
    throw new Error(result?.message);
  }
  return result?.data;
};

export const deleteType = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/type/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  // get data
  const result = await response.json();
  return result?.data;
};
