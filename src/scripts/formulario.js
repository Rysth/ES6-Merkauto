import { information } from './equipamento';

const formContent = document.querySelector('#form');
const equipmentItems = Array.from(document.querySelectorAll('.equipment'));

function createJSONFile() {
  // Get values from the HTML form
  const clientData = {
    cl_cedula: document.getElementById('cl_cedula').value,
    cl_nombre: document.getElementById('cl_nombre').value,
    cl_propietario: document.getElementById('cl_propietario').value,
    cl_direccion: document.getElementById('cl_direccion').value,
    cl_celular: document.getElementById('cl_celular').value,
    cl_telefono: document.getElementById('cl_telefono').value,
    cl_recepcion: document.getElementById('cl_recepcion').value,
    cl_tecnico: document.getElementById('cl_tecnico').value,
  };

  const vehicleData = {
    v_oc: document.getElementById('v_oc').value,
    v_clave: document.getElementById('v_clave').value,
    v_marca: document.getElementById('v_marca').value,
    v_color: document.getElementById('v_color').value,
    v_modelo: document.getElementById('v_modelo').value,
    v_anio: document.getElementById('v_anio').value,
    v_chasis: document.getElementById('v_chasis').value,
    v_motor: document.getElementById('v_motor').value,
    v_placa: document.getElementById('v_placa').value,
    v_fecha_entrega: document.getElementById('v_fecha_entrega').value,
    v_kilometraje: document.getElementById('v_kilometraje').value,
    v_detalle: document.getElementById('v_detalle').value,
  };

  const mecanicInfo = document.querySelector('#t_mecanica').value;
  const paintInfo = document.querySelector('#t_pintura').value;

  const equipmentInfo = equipmentItems.filter((item) => item.checked);
  const equipmentElements = equipmentInfo.map((element) => {
    const selectedInfo = information.find(
      (info) => info.id === parseInt(element.id),
    );
    return selectedInfo;
  });

  // Construct the JSON object
  const jsonData = {
    cliente: clientData,
    vehiculo: vehicleData,
    trabajos: {
      mecanica: mecanicInfo,
      pintura: paintInfo,
    },
    equipamento: equipmentElements,
  };

  // Convert the JSON object to a string
  const jsonContent = JSON.stringify(jsonData, null, 2);

  // You can save the JSON string as a file or perform further actions with it.
  // For example, if you want to save it as a file on the client side, you can use the FileSaver library or similar.
  return jsonContent;
}

formContent.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(createJSONFile());
});
