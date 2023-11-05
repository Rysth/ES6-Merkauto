import html2canvas from 'html2canvas';
import { information } from './equipamento';

const formContent = document.querySelector('#form');
const equipmentCheckboxes = Array.from(document.querySelectorAll('.equipment'));

// Function to capture the HTML element as an image
async function captureImage() {
  const container = document.getElementById('auto-picture');
  container.scrollTop = container.scrollHeight;
  const canvas = await html2canvas(container, { scale: 2 });
  return canvas.toDataURL('image/png');
}

// Function to extract field values by element IDs
function getFieldValueById(elementId) {
  return document.getElementById(elementId).value;
}

// Function to create and trigger a download of a text file
function downloadTextFile(filename, text) {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url); // Release the object URL
}

// Function to create and log the JSON file
async function createJSONFile() {
  try {
    const capturedImageData = await captureImage();

    const actualDate = getFieldValueById('actualDate');

    // Get values from the HTML form
    const clientData = {
      cedula: getFieldValueById('cl_cedula'),
      nombre: getFieldValueById('cl_nombre'),
      propietario: getFieldValueById('cl_propietario'),
      direccion: getFieldValueById('cl_direccion'),
      celular: getFieldValueById('cl_celular'),
      telefono: getFieldValueById('cl_telefono'),
      recepcion: getFieldValueById('cl_recepcion'),
      tecnico: getFieldValueById('cl_tecnico'),
    };

    const vehicleData = {
      oc: getFieldValueById('v_oc'),
      clave: getFieldValueById('v_clave'),
      marca: getFieldValueById('v_marca'),
      color: getFieldValueById('v_color'),
      modelo: getFieldValueById('v_modelo'),
      anio: getFieldValueById('v_anio'),
      chasis: getFieldValueById('v_chasis'),
      motor: getFieldValueById('v_motor'),
      placa: getFieldValueById('v_placa'),
      fecha_entrega: getFieldValueById('v_fecha_entrega'),
      kilometraje: getFieldValueById('v_kilometraje'),
      detalle: getFieldValueById('v_detalle'),
    };

    const mecanicInfo = getFieldValueById('t_mecanica');
    const paintInfo = getFieldValueById('t_pintura');

    const selectedEquipmentItems = equipmentCheckboxes.filter(
      (item) => item.checked,
    );
    const selectedEquipmentElements = selectedEquipmentItems.map((element) => {
      const selectedInfo = information.find(
        (info) => info.id === parseInt(element.id),
      );
      return selectedInfo;
    });

    // Construct the JSON object
    const jsonData = {
      fecha: actualDate,
      cliente: clientData,
      vehiculo: vehicleData,
      trabajos: {
        mecanica: mecanicInfo,
        pintura: paintInfo,
      },
      equipamento: selectedEquipmentElements,
      automovil: capturedImageData,
    };

    // Convert the JSON object to a string
    const jsonContent = JSON.stringify(jsonData, null, 2);
    downloadTextFile('output.txt', jsonContent);
  } catch (error) {
    console.error('Error capturing image:', error);
  }
}

formContent.addEventListener('submit', async (e) => {
  e.preventDefault();
  await createJSONFile();
});
