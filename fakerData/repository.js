const { users } = require("./module");

const findAllUser = async (txt) => {
   return await users.find();
//   const regex = new RegExp("a", "mi");
//   const pipeline = [
//     {$match:{Name:regex}},
//     {$unwind:"$address"},
//     {$project:{country:1,address:"$address",_id:0}},
//      {$group:{_id:"$country"}},
//      {$sort:{_id:1}},
//     {$addFields:{planet:"earth"}},
//    //{ $count : 'total_documents' }
// // {$facet:{ 
// //           Country: [{ $group: { _id: "$country", count: { $sum: 1 } } }],
         
// //         }},  
//   ];
//   const result = await users.aggregate(pipeline)
//   console.log(result.length)
//   return result
};

const findRelatedData = async (txt) => {
  const regex = new RegExp(txt, "mi");
  const pipeline = [
    {
      $match: {
        $or: [
          { Name: regex },
          { country: regex },
          { state: regex },
          { city: regex },
        ],
      },
    },
  ];
  const result = await users.aggregate(pipeline);
  console.log(result.length);
  return result;

  // const query = {
  //   or: [
  //     { Name: regex },
  //     { country: regex },
  //     { state: regex },
  //     { city: regex },
  //   ],
  // };
  // const data = await users.find(query);
  // return data;
};

const findCountry = async (txt) => {
  console.log(txt);
  const regex = new RegExp(txt, "mi");
  if (txt) {
    const pipeline = [
      { $match: { country: regex} },
      { $group: { _id: "$country" } },
      { $sort: { _id: 1 } }, 
     {$group:{_id:null, country:{$push:"$_id"}}},
     
     //{ $project: { country: "$_id", _id: 0 } },
     //{$addToSet:{country:[]}},
     // {$push:{crt:{country}}},
      
    ];

    const result = await users.aggregate(pipeline);
    console.log(result)
    return result[0].country
  } else {
    const pipeline = [
      { $group: { _id: "$country" } },
      { $project: { country: "$_id", _id: 0 } },
      { $sort: { country: 1 } },
    ];
    const result = await users.aggregate(pipeline);
    console.log(result);
    return result.map((item) => {
      return item.country;
    });
  }
};

const findState = async (country,sta) => {
  console.log(country);
  console.log(sta)
  //const regex = new RegExp(country, "mi");
  const regex1 = new RegExp(sta,"mi")
  if (country) {
    const pipeline = [
      { $match: { country: country, state:regex1 } },
      { $group: { _id: "$state" } },
      { $project: { state: "$_id", _id: 0 } },
      { $sort: { state: 1 } },
    ];
    const result = await users.aggregate(pipeline);
    console.log(result.length);
    return result.map((item) => {
      return item.state;
    });
    // } else {
    //   const pipeline = [
    //     { $group: { _id: "$state" } },
    //     { $project: { state: "$_id", _id: 0 } },
    //     { $sort: { state: 1 } },
    //   ];

    //   const result = await users.aggregate(pipeline);
    //   console.log(result.length);
    //   console.log(result);
    //   return result.map((item) => {
    //     return item.state;
    //   });

    // return await users.find({ $and: [{ country: country }] });
  }
};

const findCity = async (country, state,city) => {
  
  const regex2 = new RegExp(city, "mi");
  console.log(regex2);
  const pipeline = [
    { $match: { country: country, state: state, city:regex2 } },
    { $group: { _id: "$city" } },
    { $project: { city: "$_id", _id: 0 } },
    { $sort: { city: 1 } },
  ];
  const result = await users.aggregate(pipeline);
  console.log(result)
  return result.map((item) => {
    return item.city;
  });
  // return await users.find({ $and: [{ country: country }, { state: state }] });
};

const findUserData = async (filters) => {
  const country = filters.country;
  const state = filters.state;
  const city =  filters.city
  const regex = new RegExp(filters.searchText)
  console.log(filters)
  console.log(regex)
  if (filters) {
    const pipeline = [
      {
        $match: {
          $and: [{ country: country, state: state, city: city, phone: regex }],
        },
      },
    ];
    const result = await users.aggregate(pipeline);
    console.log(result);
    return result;
  }
};

module.exports = {
  findAllUser,
  findRelatedData,
  findCountry,
  findState,
  findCity,
  findUserData,
};
