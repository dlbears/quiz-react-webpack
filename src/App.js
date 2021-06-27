import React from 'react';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Quiz from './components/Quiz/Quiz';
import Home from './components/Home/Home';
import Result from './components/Result/Result';
import './App.sass';

function App() {
  const api = 'https://opentdb.com/api.php?amount=5';

  const [pointNumber, setPointNumber] = useState(0);
  const [quizPoints, setQuizPoints] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  
  // fetch quiz points
  useEffect(() => {
    // (url: string) : Promise json
    async function fetchJson(url) {
      try {
        const res = await fetch(url);
        if (res.ok) return await res.json();
        else
          throw Error(
            `Api responce error ${res.status} for the request: '${url}'`
          );
      } catch (e) {
        console.error(e);
        return null;
      }
    }
    if (!quizPoints) {
      async function setFethedQuizPointsState() {
        setQuizPoints((await fetchJson(api)).results);
      }
      setFethedQuizPointsState();
      setShowResult(false);
    }
  }, [quizPoints]);

  // shuffle options
  useEffect(() => {
    // (arr: Array<any>) : Array<any>
    function shuffle(arr) {
      return arr.sort((a, b) => 0.5 - Math.random());
    }

    // (questions: Array<Object>) : [Array<string>]
    async function shuffleOptions(quizPoints) {
      return quizPoints.map((item) => {
        return shuffle([item.correct_answer, ...item.incorrect_answers]);
      });
    }

    async function setShuffledOptionsState() {
      if (quizPoints) {
        setShuffledOptions(await shuffleOptions(quizPoints));
      }
    }
    setShuffledOptionsState();
  }, [quizPoints]);

  //
  useEffect(() => {
    if (quizPoints && quizPoints.length === pointNumber) {
      setShowResult(true);
    }
  }, [pointNumber, quizPoints]);

  return (
    <div>
      <Router>
        <div className="app">
          <header className="header">
            <nav className="header__nav">
              <Link to="/">
                <div>Home</div>
              </Link>
            </nav>
          </header>
          <main className="main">
            <div>
              <Route exact path="/">
                <Home showResult={showResult} />
              </Route>

              {(() => {
                if (quizPoints && quizPoints.length === pointNumber) {
                  return (
                    <div>
                      <Redirect from="/quiz" to="/result" />
                      <Route path="/result" replace>
                        <Result
                          quizPoints={quizPoints}
                          shuffledOptions={shuffledOptions}
                          answers={answers}
                        />
                      </Route>
                    </div>
                  );
                } else if (quizPoints && shuffledOptions) {
                  return (
                    <div>
                      <Redirect from="/result" to="/quiz" />
                      <Route path="/quiz">
                        <Quiz
                          pointNumber={pointNumber}
                          setPointNumber={setPointNumber}
                          quizPoints={quizPoints}
                          shuffledOptions={shuffledOptions}
                          setAnswers={setAnswers}
                        />
                      </Route>
                    </div>
                  );
                } else {
                  return <p>Loading...</p>;
                }
              })()}
            </div>
          </main>
          <footer className="footer">
            <a href="https://github.com/storm-sergey/quiz-react-webpack">GitHub</a>
          </footer>
        </div>
      </Router>
    </div>
  );
}

export default App;
