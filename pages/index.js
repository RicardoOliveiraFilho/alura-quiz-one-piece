/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react';
import styled from 'styled-components';

import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';

import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Alura Quiz - One Piece</title>
      </Head>
      <QuizContainer>
        <QuizLogo />

        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>

            { /* eslint-disable-next-line func-names */ }
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              // eslint-disable-next-line no-console
              console.log('Fazendo uma submissão por meio do react');
              // router manda para a próxima página.
            }}>
              <input
                // eslint-disable-next-line func-names
                onChange={function (infosDoEvento) {
                  // eslint-disable-next-line no-console
                  console.log(infosDoEvento.target.value);
                  setName(infosDoEvento.target.value);
                }}
                placeholder="Diz aí seu nome" />
              <button type="submit" disabled={name.length === 0}>
                Jogar
                {' '}
                { name }
              </button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <p>links virão aqui!!!</p>
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/RicardoOliveiraFilho/alura-quiz-one-piece" />
    </QuizBackground>
  );
}
