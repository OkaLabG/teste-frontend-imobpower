import "./styles.css";
import Pokebola from '../../images/pokebolaload.png'

function Loader() {
  return (
    <section className="loader">
      <div className="spinner">
        <img src={Pokebola} alt="Loading..." />        
      </div>
      <h1 className="text">Loading <span className="point type-animation">. . .</span></h1>
    </section>
  );
}

export default Loader;
