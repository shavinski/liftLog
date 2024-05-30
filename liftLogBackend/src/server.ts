import app from "./app"
import { PORT } from "./config"

app.listen(PORT, () => {
    console.log(`Server has started at http://localhost:${PORT}`)
})
