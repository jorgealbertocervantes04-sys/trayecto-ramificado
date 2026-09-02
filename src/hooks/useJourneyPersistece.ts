import { useEffect } from 'react';
import { useJourney } from '../contexts/JourneyContext';

const STORAGE_KEY = 'trayecto_journey_v1';

export function useJourneyPersistence() {
  const { state, resetJourney } = useJourney();

  // Cargar progreso guardado al iniciar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Aquí podrías dispatchear una acción para restaurar
        console.log('Progreso cargado:', parsed);
      } catch (e) {
        console.error('Error al cargar progreso:', e);
        resetJourney();
      }
    }
  }, []);

  // Guardar progreso cada vez que cambie
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Función para limpiar
  const clearProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    resetJourney();
  };

  return { clearProgress };
}