/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';

import Lottie from 'react-lottie';
import animationDefault from '../../assets/lottie/loading.json';

import AlternativesForm from '../../components/AlternativesForm';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';

function LoadingDefaultWidget({ info }) {
  // eslint-disable-next-line no-unused-vars
  const [animationState, setAnimationState] = useState({
    isStopped: false, isPaused: false,
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationDefault,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        isStopped={animationState.isStopped}
        isPaused={animationState.isPaused}
      />
      <h3>{info}</h3>
    </div>
  );
}

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>
      {/* O método reduce poderia ser substituído por... */}
      {/* { result.filter((x) => x).length } xD */}
      <Widget.Content>
        <p>Você acertou
          {' '}
          {results.reduce((somatorioAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatorioAtual + 1;
            }
            return somatorioAtual;
          }, 0)}
          {' '}
          perguntas
        </p>
        <ul>
          {/* eslint-disable-next-line no-shadow */}
          {results.map((result, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`result__${index}`}>
              #{ `${index + 1} ` } Resultado:
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, totalQuestions, questionIndex, onSubmit, addResult,
}) {
  const questionId = `question__${questionIndex}`;
  const [selectedAlternative, setSelectedAlternative] = useState();
  const isCorrect = selectedAlternative === question.answer;
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          { `Pergunta ${questionIndex + 1} de ${totalQuestions}` }
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{ question.title }</h2>
        <p>{ question.description }</p>

        <AlternativesForm onSubmit={(infosDoEvento) => {
          infosDoEvento.preventDefault();
          setIsQuestionSubmited(true);
          setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
          }, 2000);
        }}>
          {
            question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative__${alternativeIndex}`;
              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
              const isSelected = selectedAlternative === alternativeIndex;

              return (
                <Widget.Topic
                  key={alternativeId}
                  as="label"
                  htmlFor={alternativeId}
                  data-selected={isSelected}
                  data-status={isQuestionSubmited && alternativeStatus}
                >
                  <input
                    style={{ display: 'none' }}
                    id={alternativeId}
                    name={questionId}
                    type="radio"
                    onChange={() => setSelectedAlternative(alternativeIndex)}
                  />
                  {alternative}
                </Widget.Topic>
              );
            })
          }

          <Button
            type="submit"
            disabled={!hasAlternativeSelected}
          >Confirmar
          </Button>

          { isQuestionSubmited && isCorrect && <p>Você Acertou!</p> }
          { isQuestionSubmited && !isCorrect && <p>Você Errou!</p> }
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);

  const bg = externalBg;
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];

  const [results, setResults] = useState([]);

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 4947);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.LOADING);
      setTimeout(() => {
        setScreenState(screenStates.RESULT);
      }, 4947);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {
          // eslint-disable-next-line operator-linebreak
          screenState === screenStates.LOADING && (
          <LoadingDefaultWidget
            info={results.length > 0 ? 'Computando Resultado...' : 'Carregando Quiz...'}
          />
          )
        }

        {screenState === screenStates.RESULT && <ResultWidget results={results} /> }
      </QuizContainer>
    </QuizBackground>
  );
}
