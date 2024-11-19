import { RestartProcess } from 'concurrently';
import db from '../db'

class Program {

    static async getAllPrograms(userId: number) {
        const result = await db.query(`
            SELECT * 
            FROM programs 
            WHERE user_id = $1
            `,
            [
                userId
            ]
        )

        return result.rows
    }

}

export default Program;