import supabase from "../data-base/supabase.js";

const ENTITY_NAME = "proyecto";

export const getProyects = async () => {
  try {
    const { data, error } = await supabase().from(ENTITY_NAME).select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error getting proyects:", error);
    throw error;
  }
};

export const createProyect = async (data) => {
  const { error } = await supabase().from(ENTITY_NAME).insert(data);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteProyectByID = async (idProyecto) => {};
