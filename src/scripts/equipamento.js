export const information = [
  {
    id: 1,
    name: 'Radio',
  },
  {
    id: 2,
    name: 'Perillas de Tablero',
  },
  {
    id: 3,
    name: 'Encendedor',
  },
  {
    id: 4,
    name: 'Manual de Usuario',
  },
  {
    id: 5,
    name: 'Controles Radio',
  },
  {
    id: 6,
    name: 'Controles Alarma',
  },
  {
    id: 7,
    name: 'Moquetas',
  },
  {
    id: 8,
    name: 'Bocina',
  },
  {
    id: 9,
    name: 'Pluma',
  },
  {
    id: 10,
    name: 'Espejos ext',
  },
  {
    id: 11,
    name: 'Espejos int',
  },
  {
    id: 12,
    name: 'Antena',
  },
  {
    id: 13,
    name: 'Emblemas',
  },
  {
    id: 14,
    name: 'Tapa Aceite',
  },
  {
    id: 15,
    name: 'Tapa Gasolina',
  },
  {
    id: 16,
    name: 'Tapa Radiador',
  },
  {
    id: 17,
    name: 'Triángulo',
  },
  {
    id: 18,
    name: 'Extintor',
  },
  {
    id: 19,
    name: 'Botiquín',
  },
  {
    id: 20,
    name: 'Gata',
  },
  {
    id: 21,
    name: 'Llave Gata',
  },
  {
    id: 22,
    name: 'Tapacubos',
  },
  {
    id: 23,
    name: 'Llantas Rep',
  },
  {
    id: 24,
    name: 'Otros',
  },
];

const equipamento = document.querySelector('#equipamento');
equipamento.innerHTML = information
  .map(
    (item) => `
  <div class=" flex items-center justify-between md:hover:bg-slate-200 px-2 active:bg-blue-400 md:active:bg-blue-300 transition-colors rounded-md">
    <label for="${item.id}" class="w-full cursor-pointer  py-2 text-sm select-none">${item.name}</label>
    <input
      type="checkbox"
      id=${item.id}
      class="w-5 h-5 bg-black equipment"
    />
  </div>
`,
  )
  .join('');
