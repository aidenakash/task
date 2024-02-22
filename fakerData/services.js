const repository = require("./repository");

const getAll = async () => {
  const getFullData = await repository.findAllUser();
  if (!getFullData) return null;
  return getFullData;
};

const findTextRelatedData = async(txt)=>{

  const data = await repository.findRelatedData(txt);
  if (!data) return null;
  return data;
}

const getCountry = async(txt)=>{
  const data = await repository.findCountry(txt)
  if(!data)return null;
  return data;
}

const getState = async (country,sta) => {
  const state = await repository.findState(country,sta);
  if (!state) return null;
  return state;
};

const getCity = async (country, state,cty) => {
  const city = await repository.findCity(country, state, cty);
  if (!city) return null;
  return city;
};

const findData = async (filters) => {
  const data = await repository.findUserData(filters);
  if (!data) return null;
  return data;
};



module.exports = {
  getAll,
  findTextRelatedData,
  getCountry,
  getState,
  getCity,
  findData,
};
