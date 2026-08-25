const express=require("express")
const router=express.Router();
router.get("/getData",middleware, async (req, res) => {
  try {
        res.send(req.user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

module.exports=router;