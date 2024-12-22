/**
 * @swagger
 * /schedule:
 *   get:
 *     summary: Получение списка тренировок
 *     responses:
 *       200:
 *         description: Список тренировок успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *
 *                   id_tren:
 *                     type: number
 *                   time_clock:
 *                     type: string
 *                   time_min:
 *                     type: number
 *                   zone:
 *                     type: string
 *                   name_tren_sess:
 *                     type: string
 *                   name_trener:
 *                     type: string
 */
