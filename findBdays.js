const nodemailer = require('nodemailer');
const fs = require('fs');
let empData = fs.readFileSync("./empData.json","utf8");

empData = JSON.parse(empData);

console.log(typeof(empData));

let password = process.argv[2];

const findBday = function(DOB,mailId){
  let date = Date();

  let currentMonth = date.split(" ")[1];
  let bdayMonth;
  let birthdayWishesTo = [];

  for(let counter=0; counter<empData.length; counter++){
    bdayMonth = empData[counter].DOB.split("-")[1];
    if(bdayMonth == currentMonth){
      birthdayWishesTo.push(empData[counter].mailId);
      console.log(empData[counter].mailId);
    }
  }
  return birthdayWishesTo;
}

const authorInfo = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tusharst30999@gmail.com',
    pass: password 
  }
});

const mailInfo = {
  from: 'Tushar Tambe <tusharst30999@gmail.com>',
  to: findBday(empData).toString(),
  subject: 'Testing mail.Please ignore!!',
  text: 'This is for testing purpose. kindly ignore this mail.'
};

authorInfo.sendMail(mailInfo, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent. ');
  }
});
