import './styles.css';
import BrandLogo from './assets/images/brand.png';

/* Header */
const headerContent = document.querySelector('#header');
const brandImage = headerContent.querySelector('#brandImage');
brandImage.src = BrandLogo;

/* Main */
const actualDate = new Date();
const formatedDate = `${actualDate.getDay()}/${actualDate.getMonth()}/${actualDate.getFullYear()}`;
document.querySelector('#actualDate').innerHTML = formatedDate;
