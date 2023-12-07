// const express = require('express');
// const router = express.Router();
// const { ensureAuth, ensureGuest } = require('../middleware/auth')

// const Story = require('../models/Story')

// // Login/Landing Page
// // GET /

// router.get('/login', ensureGuest, (req, res) => {
//   res.render('login', {layout: 'login'})
// })

// // Dashboard
// // GET /dashboard
// router.get('/dashboard', ensureAuth, async (req, res) => {
//   try {
//     const stories = await Story.find({ user: req.user.id }).lean()
//     res.render('dashboard', {
//       name: req.user.firstName,
//       stories
//     })
//   } catch (err) {
//     console.error(err)
//     res.render('views/error')
//   }
  
// })

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Life Canvas' });
// });

// module.exports = router;

// Trial 1
// const express = require('express');
// const router = express.Router();
// const { ensureAuth, ensureGuest } = require('../middleware/auth');

// const Story = require('../models/Story');

// // Login/Landing Page
// router.get('/login', ensureGuest, (req, res) => {
//   res.render('login', {
//     layout: 'login', 
//     isAuthenticated: req.isAuthenticated()
//   })
// });

// // Dashboard
// router.get('/dashboard', ensureAuth, async (req, res) => {
//   try {
//     const stories = await Story.find({ user: req.user.id }).lean();
//     res.render('dashboard', {
//       isAuthenticated: req.isAuthenticated(),
//       name: req.user.firstName,
//       stories
//     });
//   } catch (err) {
//     console.error(err);
//     res.render('error', { isAuthenticated: req.isAuthenticated() });
//   }
// });

// // Home page
// router.get('/', (req, res) => {
//   res.render('index', {
//     title: 'Life Canvas',
//     isAuthenticated: req.isAuthenticated()
//   });
// });

// module.exports = router;


//Trial 2

// const express = require('express');
// const router = express.Router();
// const { ensureAuth, ensureGuest } = require('../middleware/auth');

// const Story = require('../models/Story');

// // Login/Landing Page
// router.get('/login', ensureGuest, (req, res) => {
//   res.render('login', {
//     layout: 'login',
//     isAuthenticated: req.isAuthenticated()
//   })
// });

// // Dashboard
// router.get('/dashboard', ensureAuth, async (req, res) => {
//   try {
//     const stories = await Story.find({ user: req.user.id }).lean();
//     res.render('dashboard', {
//       isAuthenticated: req.isAuthenticated(),
//       name: req.user.firstName,
//       stories
//     });
//   } catch (err) {
//     console.error(err);
//     res.render('error', { isAuthenticated: req.isAuthenticated() });
//   }
// });

// // Home page
// router.get('/', (req, res) => {
//   res.render('index', {
//     title: 'Life Canvas',
//     isAuthenticated: req.isAuthenticated()
//   });
// });

// module.exports = router;


//Trial 3
const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Story = require('../models/Story');

// Homepage
router.get('/', (req, res) => {
  res.render('index', {
    title: "Life's Canvas",
    isAuthenticated: req.isAuthenticated()
  });
});

// Register Page
router.get('/register', ensureGuest, (req, res) => {
  res.render('register', {
    isAuthenticated: req.isAuthenticated()
  });
});


// Login Page
router.get('/login', ensureGuest, (req, res) => {
  res.render('login', {
    isAuthenticated: req.isAuthenticated()
  });
});

// Dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render('dashboard', {
      isAuthenticated: req.isAuthenticated(),
      name: req.user.firstName,
      stories
    });
  } catch (err) {
    console.error(err);
    res.render('error', { isAuthenticated: req.isAuthenticated() });
  }
});

// Stories Page (or similar route if it exists)
router.get('/stories', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' }).lean();
    res.render('stories', {
      isAuthenticated: req.isAuthenticated(),
      stories
    });
  } catch (err) {
    console.error(err);
    res.render('error', { isAuthenticated: req.isAuthenticated() });
  }
});

module.exports = router;

