import {Client} from 'pg';
import express, {Request, Response} from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../docs/swagger-config';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
// const client = new Client({
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: 'postgres',
//   database: 'pyramida'
// });
// postgressupabase

// Подключение к базе данных Supabase
const client = new Client({
  host: 'aws-0-eu-west-2.pooler.supabase.com',
  port: 5432,
  user: 'postgres.ggzhtnyhdhhypezunjiu',
  password: 'postgressupabase', // Замените на ваш пароль
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false // Отключение проверки SSL для тестов (на проде лучше не использовать)
  }
});

const SECRET_KEY = 'furratytta';

//позволяет подключаться к серверу сторонним id
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use(cors({origin: 'http://localhost:4200'}));
app.use(cors({origin: '*'}));

app.use(express.json());

// Обработчик для корневого маршрута
app.get('/', (req, res) => {
  res.send('Сервер для фитнес-клуба PYRAMIDA');
});

//подключение к бд
client.connect().then(() => {
  console.log('Успешное подключение к базе данных');
}).catch(
  err => {
    console.error('Ошибка подключения к БД:', err);
  }
)




//обрабоичик получения из таблицы schedule
app.get('/api/schedule', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM schedule');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при запросе к БД:', err);
    res.status(500).json({error: 'Ошибка при запросе к БД'});
  }
});

app.get('/api/schedule/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // console.log('id serv', id)
    const result = await client.query('SELECT * FROM schedule WHERE id_tren = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при запросе к БД:', err);
    res.status(500).json({error: 'Ошибка при запросе к БД'});
  }
});



//обрабоичик получения из таблицы clients
app.get('/api/clients', async (req: Request, res: Response) => {
  try {
    const result = await client.query('SELECT * FROM clients');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при запросе к БД:', err);
    res.status(500).json({error: 'Ошибка при запросе к БД'});
  }
});

app.get('/api/user/:data', async (req: Request, res: Response) => {
  try {
    const { data } = req.params;
    const result = await client.query('SELECT * FROM clients WHERE email_client = $1', [data]);
    if (result.rows.length === 0) {
      res.status(404).send('Пользователь не найден');
    }else {
    res.send(result.rows);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});


//обработчик добавления записи в таблицу schedule
app.post('/api/schedule', async (req, res) => {
  try {
    const {time_clock, time_min, zone, name_tren_sess, name_trener} = req.body;
    const result = await client.query(
      'INSERT INTO schedule(time_clock, time_min, zone, name_tren_sess, name_trener) VALUES ($1, $2, $3, $4, $5)',
      [time_clock, time_min, zone, name_tren_sess, name_trener]
    )
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Ошибка при добавлении данных в БД:', err);
    res.status(500).json({error: 'Ошибка при добавлении данных в БД'});
  }
});

//обработчик удаления записи из таблицы schedule
app.delete('/api/schedule/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const result = await client.query('DELETE FROM schedule where id_tren=$1', [id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Ошибка при удалении данных в БД:', err);
    res.status(500).json({error: 'Ошибка при удалении данных в БД'});
  }
});


app.post('/api/register', async (req, res) => {
  try {
    const {name_client, email_client, password_client} = req.body;
    const role_client = 'user';
    // Проверка, существует ли уже email в базе данных
    const emailCheck = await client.query('SELECT * FROM clients WHERE email_client = $1', [email_client]);
    if (emailCheck.rows.length > 0) {
      res.status(400).json({error: 'Email уже используется'});
    } else {
      // Хеширование пароля
      const hashedPassword = await bcrypt.hash(password_client, 10);

      // Сохранение нового пользователя
      await client.query(
        'INSERT INTO clients(name_client, email_client, password_client, role_client) VALUES ($1, $2, $3, $4)',
        [name_client, email_client, hashedPassword, role_client]
      );

      res.status(201).json({message: 'Пользователь успешно зарегистрирован'});
    }
  } catch (err) {
    console.error('Ошибка при добавлении данных в БД:', err);
    res.status(500).json({error: 'Ошибка при добавлении данных в БД'});
  }
});


app.post('/api/login', async (req, res) => {
  const {email_client, password_client} = req.body;
  // if (!email_client || !password_client) {
  //   res.status(400).json({error: 'Заполните все поля'});
  // }
  try {
    // Поиск пользователя
    const result = await client.query(
      'SELECT * FROM clients WHERE email_client = $1',
      [email_client]);

    if (result.rows.length === 0) {
      res.status(400).json({error: 'Неверный email'});
    } else {
      const user = result.rows[0];

      // Проверка пароля
      const isMatch = await bcrypt.compare(password_client, user.password_client);
      if (!isMatch) {
        res.status(400).json({error: 'Неверный пароль'});
      } else {

        // Генерация JWT токена
        const token = jwt.sign({userId: user.id}, SECRET_KEY, {expiresIn: '1h'});
        res.json({message: 'Вход выполнен успешно', token});
      }
    }
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).json({error: 'Ошибка сервера'});
  }
});



app.get('/api/user/:id/schedule', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query('SELECT * FROM client_tren WHERE id_client = $1', [id]);
    res.status(200).json(result.rows); // Возвращаем все строки вместо одной
  } catch (err) {
    console.error('Ошибка при запросе к БД с id:', err);
    res.status(500).json({ error: 'Ошибка при запросе к БД' });
  }
});

app.get('/api/user/:id/schedule/count', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query('SELECT * FROM client_tren WHERE id_client = $1', [id]);
    res.status(200).json(result.rows.length); // Возвращаем все строки вместо одной
  } catch (err) {
    console.error('Ошибка при запросе к БД с id:', err);
    res.status(500).json({ error: 'Ошибка при запросе к БД' });
  }
});

app.post('/api/user/:id/schedule', async (req, res) => {
  try {
    const { id } = req.params;
    const { id_tren } = req.body;

    // Проверка, что id_tren передан в теле запроса
    if (!id_tren) {
      res.status(400).json({ error: 'Id тренировки отсутствует' });
    } else {

      const check = await client.query('' +
        'SELECT * FROM client_tren WHERE id_client = $1 AND id_tren = $2', [id, id_tren]);
      if (check.rows.length === 0) {

      await client.query(
        'INSERT INTO client_tren(id_client, id_tren) VALUES ($1, $2)',
        [id, id_tren]
      );

      res.status(201).json({message: 'Тренировка добавлена'});
      }
      else
        res.status(400).json({message: 'На эту тренировку вы уже записаны'});

    }
  } catch (err) {
    console.error('Ошибка при добавлении данных о тренировке в БД:', err);
    res.status(500).json({ error: 'Ошибка при добавлении данных о тренировке в БД' });
  }
});


app.delete('/api/user/:id/schedule/:id_tren', async (req, res) => {
  try {
    const { id, id_tren } = req.params;
    if (!id_tren) {
      res.status(400).json({ error: 'Id тренировки отсутствует' });
    } else {
      const result = await client.query('DELETE FROM client_tren ' +
        'WHERE id_client = $1 AND id_tren = $2', [id, id_tren]);

      res.status(200).json(result.rows[0]);
    }
} catch (err) {
  console.error('Ошибка при удалении данных в БД:', err);
  res.status(500).json({error: 'Ошибка при удалении данных в БД'});
}
});

app.put('/api/user/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { new_name, new_email } = req.body;

    // Проверка, что новые данные предоставлены
    if (!new_name || !new_email) {
      res.status(400).json({ error: 'Новое имя и email не предоставлены' });
    } else{
    // Выполнение обновления
    const result = await client.query(
      'UPDATE clients SET name_client = $1, email_client = $2 WHERE id_client = $3',
      [new_name, new_email, id]
    );

    // Проверка, было ли обновление
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Пользователь не найден' });
    } else {
      res.status(200).json({ message: 'Данные успешно обновлены' });
    }}
  } catch (err) {
    console.error('Ошибка при изменении данных в БД:', err);
    res.status(500).json({ error: 'Ошибка при изменении данных в БД' });
  }
});


app.post('/api/feedback', async (req, res) => {
  try {
    const {name_client, phone_client} = req.body;
    const result = await client.query('' +
      'INSERT INTO feedback(name_client, phone_client) VALUES ($1, $2)',
      [name_client, phone_client])
    if (result.rowCount === 0) {
      res.status(400).json({ error: 'Не удалось записать' });
    } else {
      res.status(200).json({ message: 'Данные отправлены' });
    }
  } catch (err){
    console.error(err);
    res.status(500).json({ error: 'Ошибка при добавление данных в БД' });
  }
});

app.get('/api/feedback', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM feedback');
    if (result.rowCount !== 0) {
      res.status(200).json(result.rows);
    }
    else {
      res.status(400).json({ error: 'Ошибка при чтении данных из БД' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при чтении данных из БД' });
  }
});

app.delete('/api/feedback/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query('' +
      'DELETE FROM feedback WHERE id_mess = $1',[id])
    res.status(200).json(result.rows[0]);
  }catch(err){
    console.error('Ошибка при удалении данных в БД:', err);
    res.status(500).json({ error: 'Ошибка при удалении данных из БД' });
  }
})

app.get('/api/slider', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM slider')
    if (result.rowCount !== 0) {
      res.status(200).json(result.rows);
    }
  }catch(err){
    console.error('Ошибка при удалении данных в БД:', err);
    res.status(500).json({ error: 'Ошибка при удалении данных из БД' });
  }
});


// запуск сервера
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
  console.log('Swagger available at http://localhost:3000/api-docs');
});
