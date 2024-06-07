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

export const deleteProyectById = async (proyectId) => {
  console.log("Entro en el model de delete");
  try {
    const { error } = await supabase()
      .from(ENTITY_NAME)
      .delete()
      .eq("id", proyectId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Error deleting proyect:", error);
    throw error;
  }
};

export const updateProyectById = async (proyectId, newData) => {
  try {
    const { data, error } = await supabase()
      .from(ENTITY_NAME)
      .update(newData)
      .eq("id", proyectId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error updating proyect:", error);
    throw error;
  }
};
