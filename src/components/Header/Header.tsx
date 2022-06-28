import Image from 'next/image';
import Link from 'next/link'
import styles from "./header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <div className={styles.banner}>
          <Link href="/">
            <Image
              src="/header/pokedex.png"
              width={260}
              height={56}
              layout='responsive'
            />
          </Link>
        </div>
        <div className={styles.menu}>
          <div className={styles.menuItem}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </div>
          <div className={styles.menuItem}>
            <Link href="/pokedex">
              <a>Pokedex</a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}