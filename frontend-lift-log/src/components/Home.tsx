import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Home = () => {
    const { user } = useContext(UserContext);

    console.log("Current User: ", user)

    return (
        <div>
            {!user ? (
                <h1>WELCOME</h1>
            ) : (
                <h1>A user logged in: {user.username}</h1>
            )}
        </div>
    )
}

export default Home;