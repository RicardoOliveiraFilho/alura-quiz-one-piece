/* eslint-disable react/jsx-closing-bracket-location */
import React, { useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';

import Button from '../src/components/Button';
import Footer from '../src/components/Footer';
import GithubCorner from '../src/components/GithubCorner';
import Input from '../src/components/Input';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';

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
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Diz aí seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
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
