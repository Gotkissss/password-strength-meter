# Password Strength Meter

## Instalación

npm install

## Correr tests

npm test

## Correr con coverage

npm run test:coverage

## Modo desarrollo

npm run dev

## Flujo TDD seguido

1. Se configuró el proyecto con Vite + Vitest + React Testing Library.
2. Se escribieron todos los tests primero, cubriendo renderizado, comportamiento y edge cases.
3. Se hizo commit con los tests fallando (fase roja).
4. Se implementó la lógica pura en `passwordStrength.js` y el componente `PasswordStrengthMeter.jsx`.
5. Se verificó que todos los tests pasaran (fase verde).
6. Se refactorizó manteniendo los tests en verde.

## Arquitectura

- `src/utils/passwordStrength.js` — lógica pura, sin dependencias de React.
- `src/components/PasswordStrengthMeter.jsx` — componente que usa la lógica.