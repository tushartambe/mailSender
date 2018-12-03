const nodemailer = require('nodemailer');
const fs = require('fs');
let friendsData = fs.readFileSync("./friendsData.json","utf8");

friendsData = JSON.parse(friendsData);
let password = process.argv[2];

const findBday = function(DOB,mailId){
  let date = Date();

  let currentMonth = date.split(" ")[1];
  let currentBdate = date.split(" ")[2];
  let bdayMonth;
  let bdate;
  let birthdayWishesTo = [];

  for(let counter=0; counter<friendsData.length; counter++){
    console.log(friendsData[counter].DOB);
    bdayMonth = friendsData[counter].DOB.split("-")[1];
    bdate = friendsData[counter].DOB.split("-")[0];
    if(bdayMonth){
      birthdayWishesTo.push(friendsData[counter].mailId);
      console.log(friendsData[counter].mailId);
    }
  }
  return birthdayWishesTo;
}

const authorInfo = nodemailer.createTransport({
  service : 'gmail',
  auth: {
    user: 'tusharst30999@gmail.com',
    pass: password 
  }
});

const mailInfo = {
  from: 'Tushar Tambe <tusharst30999@gmail.com>',
  to: findBday(friendsData).toString(),
  subject: 'Testing mail.Please ignore!!',
  text: 'This is for testing purpose. kindly ignore this mail.',
  attachments: {
    filename: 'somefile.png',
    path: 'https://www.google.co.in/search?q=hello&rlz=1C5CHFA_enIN812IN812&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiEveng5oLfAhWLqY8KHRyPCK0Q_AUIESgE&biw=1440&bih=749#imgrc=AXnrXJ9gozrXfM'
  }
};

authorInfo.sendMail(mailInfo, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent. ');
  }
});
