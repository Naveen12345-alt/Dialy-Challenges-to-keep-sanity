import Carousal from './app/carousal';
import './styles.scss';

function loadApp() {
  const carousal = new Carousal({
    autoplay: true,
    duration: 1000,
    pauseOnHover: true,
  });
}

loadApp();
