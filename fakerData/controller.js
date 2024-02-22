const services = require("./services");

//getAllData
const findAllData = async (req, res) => {
  try {
    const getAllData = await services.getAll();
    if (getAllData) return res.status(200).send(getAllData);
    return res.status(404).send(" Data not Found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// search Text
const searchText = async (req, res) => {
  try {
    const txt = req.query.searchText;
    const getText = await services.findTextRelatedData(txt);
    if (getText) return res.status(200).send(getText);

    return res.status(404).send(" Data not Found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//get list of country
const listOfCountry = async (req, res) => {
  try {
    const txt = req.query.searchText;
    const getCountry = await services.getCountry(txt);
    if (getCountry) {
      console.log(getCountry.length)
      return res.status(200).send(getCountry);
    } else {
      return res.status(404).send("Data Not Found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//get list of state using country
const listOfState = async (req, res) => {
  try {
    const country = req.query.country;
    const state = req.query.state
    if (country) {
      const getState = await services.getState(country, state);
      return res.status(200).send(getState);
    } else {
      return res.status(404).send("Data Not Found");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//get list fo city using country and state
const listOfCity = async (req, res) => {
  try {
    const country = req.query.country;
    const state = req.query.state;
    const city = req.query.city;
    console.log(country, state, city)

    if (country && state) {
      const getCity = await services.getCity(country, state, city);
      return res.status(200).send(getCity);
    }
    return res.status(404).send("Data Not Found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// get list of user data by country or state or city
const getUserData = async (req, res) => {
  try {
    const { country, state, city , searchText} = req.query;

    const filters = {};
    if (country) filters.country = country;
    if (state) filters.state = state;
    if (city) filters.city = city;
    if(searchText) filters.searchText = searchText;
    
    const data = await services.findData(filters);

    if (data) return res.status(200).send(data);
    else
      return res.status(404).send("Data not found based on provided filters");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  findAllData,
  listOfCountry,
  listOfState,
  listOfCity,
  getUserData,
  searchText,
};
