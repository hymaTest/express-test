const { exec, escape } =  require('../db/mysql');

const login = (req, res) => {
  const { username, password } = req.body;
  console.log('login data', username, password, req.body);
  const sql = `select username, realname from user where username=${escape(username)} and password=${escape(password)}`;
  console.log('-----sql', sql);
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
};

module.exports = {
  login
}