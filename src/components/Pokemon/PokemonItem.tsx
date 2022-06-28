import Link from 'next/link'
import { css } from 'office-ui-fabric-react';
import { Card } from 'reactstrap';
import styles from "./PokemonItem.module.scss";

export default function PokemonItem({ pokemon }) {

    return (
        <Card className={css("col-sm-12 col-md-4 col-lg-3 border-0 mb-3", styles.card)}>
            <div className={css("rounded", styles.divImg)}>
                <img
                    src={pokemon.urlImage}
                    width={160}
                    height={160}
                />
            </div>
            <Link href={`/pokemonDetalhes/${pokemon.name}`}>
                <a className={css('text-decoration-none', styles.name)}>{`${pokemon.name}`}</a>
            </Link>
        </Card>
    )
}