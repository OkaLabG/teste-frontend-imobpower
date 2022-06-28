import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import Header from "../src/components/Header/Header";
import styles from "./index.module.scss";

export default function Index() {
    return (
        <>
            <Header />
            <div className={styles.page}>
                <div className={styles.container}>
                    <article className={styles.article}>
                        <div>
                            <h1>Pokémon</h1>
                        </div>
                        <div className='row'>
                            <div className="col-sm-12 col-md-6">
                                <Image
                                    src="/pokemon.jpeg"
                                    width={613}
                                    height={613}
                                    layout='responsive'
                                />
                            </div>
                            <div className="col-sm-12 col-md-6">

                                <p>Pokémon são criaturas fictícias que pertencem ao universo da série de mesmo nome - <em>Pokémon</em>. Originalmente, a série foi criada como um jogo de videogame e, com a sua popularização, se espalhou para diversos outros formatos, como séries de TV, filmes e livros.</p>
                                <p>A palavra pokémon é a contração de duas palavras em inglês: <em>pocket</em>, que significa bolso; e <em>monster</em>, que significa monstro. Assim, um pokémon é um <strong>"monstro de bolso"</strong>, na tradução literal.</p>
                                <p>Os jogos do gênero RPG da franquia Pokémon foram criados por Satoshi Tajiri em 1996. Com o sucesso do jogo, houve a adaptação para formatos de animação audiovisual, como animes (desenhos animados japoneses) e filmes.</p>
                                <p>A maior parte dos pokémon sofrem metamorfoses, evoluindo para seres mais avançados e com uma estética diferente. Com o tempo também aprendem novas técnicas ou ataques, que podem utilizar em combate.</p>
                                <p>Com o sucesso do anime no final da década de 1990, surgiram vários outros jogos de Pokémon, os primeiros para console Game Boy, da empresa Nintendo. Mais tarde, foram criados jogos online de Pokémon, como o <em>Pokémon Deluge </em>e o<em> Pokémon GO.</em></p>
                            </div>
                        </div>

                    </article>
                </div>
            </div >
        </>
    )
}