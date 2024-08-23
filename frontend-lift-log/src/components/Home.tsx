import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Home = () => {
    // Not sure how to fix this type issue with UserContext 
    const { user } = useContext(UserContext);

    return (
        <div>
            {!user ? (
                <h1>WELCOME</h1>
            ) : (
                <h1 className="m-5 flex flex-col justify-center items-center">A user logged in: {user.username}</h1>
            )}
        </div>
    )
}

export default Home;