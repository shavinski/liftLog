import { RestartProcess } from 'concurrently';
import db from '../db'

class Program {

    static async getAllUserPrograms(userId: number) {
        const result = await db.query(`
            SELECT * 
            FROM programs 
            WHERE user_id = $1
            `,
            [
                userId
            ]
        )

        return result.rows;
    }

    static async getSingleUserProgram(programId: number) {
        const result = await db.query(`
                SELECT *
                FROM programs
                WHERE program_id = $1
            `,
            [
                programId
            ]
        )

        return result.rows[0];
    }

}

export default Program;