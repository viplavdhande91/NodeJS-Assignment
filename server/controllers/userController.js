const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database : 'node_db'
});


// View Students
exports.view_teacher = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
  });
}

// Find Student by Search
exports.find_teacher = (req, res) => {
  let searchTerm = req.body.search;
  connection.query('SELECT * FROM user WHERE name_of LIKE ? OR roll_no LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
  });
}




exports.form_student = (req, res) => {
  res.render('student_check');
}



// Find Student by Search
exports.find_student = (req, res) => {
  let searchTerm = req.body.search;
 // console.log("Reached here");
  console.log(searchTerm);

  connection.query('SELECT * FROM user WHERE roll_no LIKE ? ', ['%' + searchTerm + '%'], (err, rows) => {
    console.log(rows);

    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}


// Add new Student Record
exports.create = (req, res) => {
  const {name_of, roll_no, dob, score } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO user SET name_of = ?, roll_no = ?, dob = ?, score = ?', [name_of, roll_no, dob, score], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'User added successfully.' });
    } else {
      console.log(err);
    }
  });
}


// Edit Student Record 
exports.edit = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
  });
}


// Update Student Record
exports.update = (req, res) => {
  const { name_of, roll_no, dob, score } = req.body;
  // User the connection
  connection.query('UPDATE user SET name_of = ?, roll_no = ?, dob = ?, score = ? WHERE id = ?', [name_of, roll_no, dob, score, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('edit-user', { rows, alert: `${name_of} has been updated.` });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}

// Delete Student Record
exports.delete = (req, res) => {

  // Delete a record

  //User the connection
  connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

    if(!err) {
      res.redirect('/');
    } else {
      console.log(err);
    }

  });

  

}

// View Students
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
  });

}