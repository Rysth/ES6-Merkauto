import './styles.css';
import './scripts/equipamento.js';
import './scripts/automovil.js';
import BrandLogo from './assets/images/brand.png';

/* Header */
const headerContent = document.querySelector('#header');
const brandImage = headerContent.querySelector('#brandImage');
brandImage.src = BrandLogo;

/* Main */
const actualDate = new Date();
const actualDay = actualDate.getDay() < 10 ? `0${actualDate.getDay()}` : actualDate.getDay();
const formatedDate = `${actualDay}/${actualDate.getMonth()}/${actualDate.getFullYear()}`;
document.querySelector('#actualDate').innerHTML = formatedDate;
