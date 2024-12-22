import {Client} from 'pg';

const client = new Client({
  host: "LocalHost",
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'kbd1'
});

async function connectToDb() {
  try {
    await client.connect()
    console.log('Успешное подключение к БД');

    // await client.query('DROP TABLE feedback');

    // await client.query('CREATE TABLE schedule(' +
    //   'id_tren SERIAL PRIMARY KEY,' +
    //   'time_clock VARCHAR(50) NOT NULL,' +
    //   'time_min INT NOT NULL,' +
    //   'zone VARCHAR(50) NOT NULL,' +
    //   'name_tren_sess VARCHAR(50) NOT NULL,' +
    //   'name_trener VARCHAR(50) NOT NULL)')

    // await client.query('CREATE TABLE clients(' +
    //   'id_client SERIAL PRIMARY KEY,' +
    //   'name_client VARCHAR(50) NOT NULL,' +
    //   'email_client VARCHAR(50) NOT NULL,' +
    //   'password_client VARCHAR(200) NOT NULL,' +
    //   'role_client VARCHAR(50) NOT NULL)')

    // await client.query('CREATE TABLE slider(' +
    //   'id_photo SERIAL PRIMARY KEY,' +
    //   'url_photo VARCHAR(100) NOT NULL)')

    // await client.query(
    //   'INSERT INTO slider(url_photo) VALUES ($1)',
    //   ["./assets/img/slider4.jpg"]
    // )

    // await client.query('CREATE TABLE feedback(' +
    //   'id_mess SERIAL PRIMARY KEY,' +
    //   'name_client VARCHAR(50) NOT NULL,' +
    //   'phone_client VARCHAR(50) NOT NULL)')

    // await client.query('CREATE TABLE client_tren(' +
    //   'id_client INT NOT NULL,' +
    //   'id_tren INT NOT NULL)')


    // await client.query(
    //   'INSERT INTO schedule(time_clock, time_min, zone, name_tren_sess, name_trener) VALUES ($1, $2, $3, $4, $5)',
    //   ['10:00', '55', 'Зал групповых программ', 'Functional Training', 'Алексей Василенко']
    // );


    // const res = await client.query('SELECT * FROM clients');
    // console.log('Результат запроса: ', res.rows);

    await client.end()
    console.log('Отключены от БД');
  } catch (err) {
    console.error('Ошибка подключения к БД в дб:', err);

    await client.end();
    console.log('Подключение закрыто');
  }
}

connectToDb()
