import { useState } from "react";
import WordsService from "../services/wordsService";

const AppHome = () => {
    const [word, setWord] = useState("");
    const [message, setMessage] = useState(null);
    const [points, setPoints] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [currentWordPoints, setCurrentWordPoints] = useState(0);
    const [error, setError] = useState("");

    const charRegex = /[^a-zA-Z\s]/;

    const resetWord = () => {
        setWord("");
    }

    const handleWord = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setMessage("");

        if (!word) {
            setError("You have to enter a word.");
            resetWord();
            setIsLoading(false);
            return;
        }

        if (charRegex.test(word)) {
            setError("Word should only contain letters!");
            resetWord();
            setIsLoading(false);
            return;
        }

        try {
            const response = await WordsService.getWord(word);
            const points = response.data;
            setMessage(`You have got ${points} points for word ${word}.`);
            setPoints(prevValue => prevValue + points);
            setCurrentWordPoints(points);
        } catch (err) {
            const errorMessage = err?.response?.data?.message || "Try again.";                
            setError(errorMessage);
        } finally {
            setIsLoading(false);
            resetWord();
        }
    }

    return (
        <div className="container">
            <h2>Enter word</h2>
            <h2>Score: {points}</h2>
            <form className="form" onSubmit={handleWord}>
                <input type="text" name="word" placeholder="Word" value={word} onChange={e => setWord(e.target.value)} className="input" />
                {isLoading ? (
                    <div></div>
                        ) : (
                            <button className="btn" type="submit">Submit</button>
                        )}
            </form>
                {message && (
                    <p className={`message ${currentWordPoints === 0 ? "error" : "success"}`}>{message}</p>
                )}
                {error && (
                    <p className="message error">{error}</p>
                )}
        </div>
    );
}

export default AppHome;







