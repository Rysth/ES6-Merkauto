import '../../main';

import '../../scripts/equipamento.js';
import '../../scripts/automovil.js';
import '../../scripts/formulario.js';

// Get the current date
const currentDate = new Date();

// Define options for formatting the date
const dateFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
};

// Format the date using the Intl.DateTimeFormat API
const formattedDate = new Intl.DateTimeFormat(
  'en-US',
  dateFormatOptions,
).format(currentDate);

// Update the HTML element with the formatted date
document.querySelector('#actualDate').textContent = formattedDate;
