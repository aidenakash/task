const { users } = require("./fakerData/module");
const { faker } = require("@faker-js/faker");

 const generateUsers = (num)=>{
        const user =[]; 
        for(i=0;i<num;i++){
            const Name = faker.person.fullName();
            const phone = faker.phone.number();
            const email =  faker.internet.email();
            const country = faker.location.country();
            const state = faker.location.state();
            const city = faker.location.city();
            const address = faker.location.secondaryAddress();
            user.push({Name, phone, email, country, state, city, address})
        } 
        //return user;
    

    users.insertMany(user)
  .then(docs => console.log(`${docs.length} users have been inserted into the database.`))
  .catch(err => {
    console.error(err);
    console.error(`${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`);
  });
};

  module.exports = {generateUsers}
  