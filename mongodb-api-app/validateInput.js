function validateRegisterInput(res, body){
    if (!body.fname) {
        res.status(400).send({
          message: "Content [FIRST NAME] can not be empty!",
        });
        return;
      }
    
      if (!body.lname) {
        res.status(400).send({
          message: "Content [LAST NAME] can not be empty!",
        });
        return;
      }
    
      if (!body.username) {
        res.status(400).send({
          message: "Content [USERNAME] can not be empty!",
        });
        return;
      }
    
      if (!body.password) {
        res.status(400).send({
          message: "Content [PASSWORD] can not be empty!",
        });
        return;
      }
    
      if (!body.email) {
        res.status(400).send({
          message: "Content [EMAIL] can not be empty!",
        });
        return;
      }
};
function validateLoginInput(res, body){
      if (!body.username) {
        res.status(400).send({
          message: "Content [USERNAME] can not be empty!",
        });
        return;
      }
    
      if (!body.password) {
        res.status(400).send({
          message: "Content [PASSWORD] can not be empty!",
        });
        return;
      }
};
module.exports = {validateRegisterInput, validateLoginInput};