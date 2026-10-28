// Importando los estilos de la pagina
import './styles/main.css';

// Lógica para que el botón funcione interactivamente
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('button');
  if (btn) {
    btn.addEventListener('click', () => {
      // eslint-disable-next-line no-console
      console.log('Botón presionado');
    });
  }
});
// eslint-disable-next-line no-console
console.warn('🎉 Vite ⚡+ EXPRESS 🚂 Working!!');