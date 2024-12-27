export const getModels = async () => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/models`;

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

export const getModelsById = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/models/${id}`;

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

export const createModels = async (request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("model_name", request.model_name);
  formData.append("manufacturer", request.manufacturer);
  formData.append("transmission", request.transmission);
  formData.append("description", request.description);
  formData.append("type_id", request.type_id);
  formData.append("specs", request.specs);
  formData.append("options", request.options);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/models`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  return result?.data;
};

export const updateModels = async (id, request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("model_name", request.model_name);
  formData.append("manufacturer", request.manufacturer);
  formData.append("transmission", request.transmission);
  formData.append("type_id", request.type_id);
  formData.append("description", request.description);
  formData.append("specs", request.specs);
  formData.append("options", request.options);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/models/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: formData,
  });

  const result = await response.json();
  return result?.data;
};

export const deleteModels = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/models/${id}`;

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
