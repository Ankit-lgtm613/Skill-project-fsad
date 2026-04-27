const mysql = require('mysql2/promise');

async function checkData() {
  const connection = await mysql.createConnection('mysql://root:EdLUHtQPUpPKEFKAvqbPZvcqEwRhjcQp@switchback.proxy.rlwy.net:28899/railway');
  try {
    const [users] = await connection.execute('SELECT * FROM users');
    console.log('Users count:', users.length);
    
    const [jobs] = await connection.execute('SELECT * FROM jobs');
    console.log('Jobs count:', jobs.length);
    
    const [pros] = await connection.execute('SELECT * FROM professionals');
    console.log('Professionals count:', pros.length);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await connection.end();
  }
}

checkData();
