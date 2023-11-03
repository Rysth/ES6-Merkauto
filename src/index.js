import './styles.css';
import { Equipamento } from './scripts/equipamento.js';
import BrandLogo from './assets/images/brand.png';

/* Header */
const headerContent = document.querySelector('#header');
const brandImage = headerContent.querySelector('#brandImage');
brandImage.src = BrandLogo;

/* Main */
const actualDate = new Date();
const formatedDate = `${actualDate.getDay()}/${actualDate.getMonth()}/${actualDate.getFullYear()}`;
document.querySelector('#actualDate').innerHTML = formatedDate;

const equipamento = document.querySelector('#equipamento');
equipamento.innerHTML = Equipamento.map(
  (item) => `
  <div class="flex items-center justify-between md:hover:bg-slate-200 px-2 active:bg-blue-400 md:active:bg-blue-300 transition-colors rounded-md">
    <label for="equipamento-${item.id}" class="w-full cursor-pointer  py-2 text-sm md:text-base select-none">${item.name}</label>
    <input
      type="checkbox"
      id=equipamento-${item.id}
      class="w-5 h-5  bg-black"
    />
  </div>
`,
).join('');
