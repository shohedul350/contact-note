const router=require('express').Router();
const {check,validationResult}=require('express-validator')

const Guest=require('../models/Guest');
const Authentication=require('../middleware/authenticate')

router.get('/',Authentication,(req,res)=>{
    Guest.find({user:req.user.id})
    .then(guests=>{
        res.send(guests)
    })
    .catch(err=>{
        res.status(400).send('server Error');
    })
})




//@route post guest/
//@desc Authentication & get token
//@access Public
router.post('/',Authentication,

[

  check('name', 'Please provide the phone').not().isEmpty(),

    check('phone', 'Please provide the phone').not().isEmpty()
],

(req,res)=>{
  const errors=validationResult(req);
        if(!errors.isEmpty()){
          return res.status(400).json({
            errors:errors.array()
          });
  }
  const{name,phone,dietary,isconfirmed}=req.body;

  let guests= new Guest({
      user:req.user.id,
      name,
      phone,
      dietary,
      isconfirmed
  })
 
  guests.save()
  .then(() => res.status(201).json({msg: 'Saved'}))
  .catch(err=>{
    console.log(err)
    res.status(400).send('server Error 56 line');
  })

})
// router.post('/',
//   [
//     Authentication,
//     [
//       check('name', 'Please provide the name').not().isEmpty(),
//       check('phone', 'Please provide the phone').not().isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() })
//     }

//     const { name, phone, dietary, isconfirmed } = req.body

//     try {
//       const newGuest = new Guest({
//         user: req.user.id,
//         name,
//         phone,
//         dietary,
//         isconfirmed
//       })
//       const guest = await newGuest.save()

//       res.json(guest)

//     } catch (err) {

//       console.error(err.message)
//       res.status(500).send('server error 92')
//     }
//   })



// delete

router.delete('/delete/:id',Authentication,(req,res)=>{
  Guest.findById(req.params.id)
  .then(guest=>{
    if(!guest){
      return res.status(404).json({msg:'Guest not found'})
    }
    Guest.findByIdAndRemove(req.params.id)
    .then(()=>{
      res.send('guest remove')
    })
    .catch(err=>{
      res.status(400).send('server Error');
  })
  })
  .catch(err=>{
    res.status(400).send('server Error');
})
})


//update
router.put('/update/:id',Authentication,(req,res)=>{
  const {name,phone,dietary,isconfirmed}=req.body;
  const updateGuest={name,phone,dietary,isconfirmed}

  Guest.findById(req.params.id)
  .then(result=>{
    if(!result){
      return res.status(404).json({msg:'Guest not found'})
    }
    Guest.findByIdAndUpdate(req.params.id,{$set:updateGuest},{new:true})
    .then((upguest)=>{
      res.send(upguest)
    })
    .catch(err=>{
      res.status(400).send('server Error');
  })
  })
  .catch(err=>{
    res.status(400).send('server Error');
})

})
module.exports=router