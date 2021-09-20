import { api } from '../../services/api';
import { GetStaticProps, GetStaticPaths } from 'next';
import styles from '../../styles/repositores.module.scss';
import Star from '../../assets/star.svg';
import Fork from '../../assets/fork.svg';
import Issue from '../../assets/issue.svg';
import Back from '../../assets/back.svg';
import Github from '../../assets/github.svg';
import Link from 'next/link';

type Repo = {
  full_name: string,
  name: string;
  id: string,
  forks_count: number,
  stargazers_count: number;
  open_issues_count: number,
  description: string,
  owner: {
    login: string,
    avatar_url: string,
  }
}
type RepoProps = {
  repo: Repo,
}

export default function Repositores({ repo }: RepoProps) {
  console.log(repo)

  return (
    <div className={styles.reposContainer}>
      <div className={styles.bio}>
        <Link href={`/`}>
          <button type="button">
            <Back />
          </button>
        </Link>

      <img src={repo.owner.avatar_url} alt="Foto de perfil" />
      <h1>{repo.full_name}</h1>
      <p>{repo.description}</p>
      </div>

      <div className={styles.github}> 
        <a target="_blank" href={`https://github.com/${repo.owner.login}`}>
          <button type="button">
            <Github />
          </button>
        </a>
      </div>

      <div className={styles.actions}>
      <h2>
        <span><Star/>{repo.stargazers_count}</span>
        <p>Stars</p>
      </h2>
      
      <h2>
        <span><Fork/>{repo.forks_count}</span>
        <p>Forks</p>
        </h2>

      <h2>
        <span><Issue/>{repo.open_issues_count}</span>
        <p>Issues abertas</p>
      </h2>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{
      params: {
        slug: ['batrizz', "podcastr-nlw"]
      }
    }],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  console.log(ctx.params)
  
  const { data } = await api.get(`/repos/${slug[0]}/${slug[1]}`)

  return {
    props: {
      repo: data,
    },
    revalidate: 60 * 60 * 4, //4 horas
  }
}
