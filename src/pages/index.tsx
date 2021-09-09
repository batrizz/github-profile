import { useState } from "react";
import React from "react";
import { api } from '../services/api';
import Link from 'next/link';
import styles from '../styles/home.module.scss';
import Arrow from '../assets/arrow.svg';
import GithubImg from '../assets/githubimg.svg';

type Repo = {
  full_name: string,
  name: string;
  id: string,
}

type Data = {
  avatar_url: string,
  login: string,
  bio: string,
}
export default function Home() {

  const [ searchUser, setSearchUser ] = useState('');
  const [ dataUser, setDataUser ] = useState<Data>({} as Data);
  const [ repos, setRepos ] = useState<Repo[]>([]);
  const [ show, setShow ] = useState(false);

  async function handleSearchUser(event){
    event.preventDefault()

    if (searchUser.trim() == ''){
      return;
    }
    
    const response = await api.get(`/users/${searchUser}/repos`);
    const userReponse = await api.get(`/users/${searchUser}`);
    
    setDataUser(userReponse.data)
    setRepos(response.data)

    console.log(response.data);
    console.log(userReponse.data);
  }

  return(
    <div className={styles.homepage}>
      <div className={styles.imgGithub}>
          <GithubImg/>
        </div>
      <form onSubmit={handleSearchUser}>
        <div className={styles.text}>
        <h1> Explorar repositórios no Github </h1>
        <p> Digite o usuário do(a) autor(a) do repositório: </p>
        </div>
        <input 
          type="text"
          placeholder="Pesquise o usuário"
          onChange={event => setSearchUser(event.target.value)}
          value={searchUser}
          />
        <button type="submit"> 
          Pesquisar
        </button>
        
        {repos.length !== 0 && (
          <>
            <div className={styles.boxRepos}>
              <img src={dataUser?.avatar_url} alt="" />
              <h1>{dataUser.login}</h1>
              <button type="button" onClick={ () =>setShow(!show)}>
                <Arrow/>
              </button>
              { show? 
                <ul className={styles.repositoresList}>
                {repos.map(repo => (
                  <li key={repo.id}>
                    <Link href={`/repositores/${repo.full_name}`}>
                      <a>{repo.full_name}</a> 
                    </Link>
                  </li>
                ))}
                </ul>
              :null
              }
            </div>
          </>
        )}
      </form>   
    </div>
  );
}

