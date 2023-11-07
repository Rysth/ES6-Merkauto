import html2canvas from 'html2canvas';
import { information } from './equipamento.js';

const formContent = document.querySelector('#form');
const equipmentCheckboxes = Array.from(document.querySelectorAll('.equipment'));

// Function to extract field values by element IDs
function getFieldValueById(elementId) {
  return document.getElementById(elementId).value;
}

function readJSONFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };

    reader.readAsText(file);
  });
}

const fileInput = document.querySelector('#fileInput');

function checkEquipmentFromJSON(equipmentArray) {
  equipmentArray.forEach((equipment) => {
    const checkboxId = `${equipment.id}`;
    const checkbox = document.getElementById(checkboxId);
    if (checkbox) {
      checkbox.checked = true;
    }
  });
}

fileInput.addEventListener('change', (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    readJSONFromFile(selectedFile)
      .then((jsonData) => {
        // Now you have the JSON data from the file
        console.log(jsonData);

        // Clients Data
        document.getElementById('cl_cedula').value = jsonData.cliente.cedula;
        document.getElementById('cl_nombre').value = jsonData.cliente.nombre;
        document.getElementById('cl_propietario').value =
          jsonData.cliente.propietario;
        document.getElementById('cl_direccion').value =
          jsonData.cliente.direccion;
        document.getElementById('cl_celular').value = jsonData.cliente.celular;
        document.getElementById('cl_telefono').value =
          jsonData.cliente.telefono;
        document.getElementById('cl_recepcion').value =
          jsonData.cliente.recepcion;
        document.getElementById('cl_tecnico').value = jsonData.cliente.tecnico;

        // Vehicle's Data
        document.getElementById('v_oc').value = jsonData.vehiculo.oc;
        document.getElementById('v_clave').value = jsonData.vehiculo.clave;
        document.getElementById('v_marca').value = jsonData.vehiculo.marca;
        document.getElementById('v_color').value = jsonData.vehiculo.color;
        document.getElementById('v_modelo').value = jsonData.vehiculo.modelo;
        document.getElementById('v_anio').value = jsonData.vehiculo.anio;
        document.getElementById('v_chasis').value = jsonData.vehiculo.chasis;
        document.getElementById('v_motor').value = jsonData.vehiculo.motor;
        document.getElementById('v_placa').value = jsonData.vehiculo.motor;
        document.getElementById('v_placa').value = jsonData.vehiculo.placa;
        document.getElementById('v_fecha_entrega').value =
          jsonData.vehiculo.fecha_entrega;
        document.getElementById('v_kilometraje').value =
          jsonData.vehiculo.kilometraje;
        document.getElementById('v_detalle').value = jsonData.vehiculo.detalle;
        document.getElementById('v_combustible').value =
          jsonData.vehiculo.combustible;

        document.getElementById('t_mecanica').value =
          jsonData.trabajos.mecanica;
        document.getElementById('t_pintura').value = jsonData.trabajos.pintura;

        checkEquipmentFromJSON(jsonData.equipamento);
      })
      .catch((error) => {
        console.error('Error reading the file:', error);
      });
  }
});

// Function to capture the HTML element as an image
async function captureImage() {
  const container = document.getElementById('auto-picture');
  container.scrollTop = container.scrollHeight;
  const canvas = await html2canvas(container, { scale: 2 });
  return canvas.toDataURL('image/png');
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
      combustible: getFieldValueById('v_combustible'),
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
