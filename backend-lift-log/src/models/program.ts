import { RestartProcess } from 'concurrently';
import db from '../db'

class Program {

    /**
     * Retrieves all programs associated with a specific user.
     * 
     * @param {number} userId - The ID of the user whose programs are being retrieved.
     * @returns {Promise<object[]>} - A promise that resolves to an array of programs associated with the user.
     * @throws {Error} - Throws an error if the database query fails.
     */

    static async getAllUserPrograms(userId: number): Promise<object[]> {
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

    /**
     * Retrieves a specific program by its ID, including its associated exercises.
     * 
     * @param {number} programId - The ID of the program to retrieve.
     * @returns {Promise<object>} - A promise that resolves to an object representing the program, 
     *                               including an array of exercises associated with it.
     * @throws {Error} - Throws an error if the program is not found or if the database query fails.
     */

    static async getSingleUserProgram(programId: number): Promise<object[]> {
        const programResult = await db.query(`
                SELECT *
                FROM programs
                WHERE program_id = $1
            `,
            [
                programId
            ]
        )

        const userProgram = programResult.rows[0];

        const exercises = await db.query(`
            SELECT
                exercises.exercise_name as "exerciseName",
                exercises.muscle_group as "muscleGroup"
            FROM
                programs
                INNER JOIN program_exercises ON program_exercises.program_id = programs.program_id
                INNER JOIN exercises ON exercises.exercise_id = program_exercises.exercise_id
            WHERE
                programs.program_id = $1;
            `,
            [
                programId
            ])

        const programExercises = exercises.rows;
        userProgram.exercises = programExercises;

        return userProgram;
    }

}

export default Program;