import { $authHost, $host } from ".";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/device", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};

export const fetchActualDevices = async (page, limit = 5) => {
  const { data } = await $host.get("api/device/actual", {
    params: {
      page,
      limit,
      relevance: "actual",
    },
  });
  return data;
};
// export const fetchSearchDevices = async (page, limit = 5) => {
//   const { data } = await $host.get("api/device/search", {
//     params: {
//       page,
//       limit,
//     },
//   });
//   return data;
// };
export const fetchSearchDevices = async (page, limit = 5, searchTerm = "") => {
  try {
    const { data } = await $host.get("api/device/search", {
      params: {
        page,
        limit,
        searchTerm,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching search devices:", error);
    throw error;
  }
};
