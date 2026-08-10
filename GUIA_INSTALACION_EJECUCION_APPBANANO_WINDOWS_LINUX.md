# Guía paso a paso para instalar y ejecutar AppBanano

Esta guía explica **desde cero** cómo instalar y ejecutar AppBanano en:

- Windows 10/11
- Linux (Ubuntu/Debian y distribuciones similares)

La aplicación tiene dos componentes que deben ejecutarse por separado:

```text
AppBanano
│
├── backend/     → Python + FastAPI
│
└── frontend/    → React + Vite
```

Además, el backend se conecta a **MongoDB Atlas** en Internet. Por eso **NO necesitas instalar MongoDB Server localmente** para ejecutar esta aplicación.

---

# 1. Antes de empezar

## 1.1. Qué necesitas instalar

Para ejecutar la aplicación necesitas:

| Programa | Para qué sirve | Necesario |
|---|---|---|
| Python 3.12 | Ejecutar el backend | Sí |
| pip | Instalar paquetes Python | Sí |
| Node.js LTS | Ejecutar/compilar el frontend | Sí |
| npm | Instalar paquetes JavaScript | Sí |
| MongoDB local | Base de datos | **No** |
| Git | Control de versiones | No |
| MongoDB Compass | Consultar MongoDB visualmente | No |

La aplicación que recibiste ya contiene el código del backend y frontend.

---

# 2. Estructura que debes tener

Después de descomprimir `appBanano.zip`, debes tener aproximadamente:

```text
appBanano/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   ├── .env
│   └── ...
│
└── frontend/
    ├── src/
    ├── package.json
    ├── package-lock.json
    └── ...
```

> **Importante:** el ZIP también contiene carpetas generadas como `venv` y/o `node_modules`. No es recomendable depender de esas carpetas. En esta guía las recrearemos en cada computador.

---

# 3. Cómo funciona la aplicación

Cuando todo esté funcionando, la comunicación será:

```text
                 TU NAVEGADOR
                       │
                       │ http://localhost:5173
                       ▼
              ┌─────────────────┐
              │    FRONTEND     │
              │  React + Vite   │
              └────────┬────────┘
                       │
                       │ HTTP
                       │
                       ▼
              ┌─────────────────┐
              │     BACKEND     │
              │ FastAPI/Uvicorn │
              │ puerto 8000     │
              └────────┬────────┘
                       │
                       │ conexión MongoDB
                       ▼
              ┌─────────────────┐
              │  MongoDB Atlas  │
              │      Nube       │
              └─────────────────┘
```

Por eso, durante el desarrollo debes tener **dos terminales abiertas**:

```text
Terminal 1 → Backend
Terminal 2 → Frontend
```

---

# PARTE A — INSTALACIÓN EN WINDOWS

# 4. Paso 1 — Instalar Python

El backend de esta aplicación está basado en Python.

La recomendación es utilizar **Python 3.12**, que corresponde a la versión utilizada por el entorno del proyecto.

La documentación oficial de Python 3.12 está disponible aquí:

https://docs.python.org/3.12/

## 4.1. Descargar Python

Ve a:

https://www.python.org/downloads/

Descarga Python 3.12 para Windows.

## 4.2. Instalar Python

Ejecuta el instalador.

En la primera pantalla del instalador, es muy importante activar:

```text
Add python.exe to PATH
```

Después selecciona:

```text
Install Now
```

Espera a que termine.

---

# 5. Paso 2 — Comprobar Python en Windows

Cierra la terminal que tuvieras abierta y abre una nueva:

```text
PowerShell
```

Ejecuta:

```powershell
python --version
```

Deberías obtener algo parecido a:

```text
Python 3.12.x
```

También puedes comprobar:

```powershell
py --version
```

Debería aparecer:

```text
Python 3.12.x
```

## Si `python` no funciona

Prueba:

```powershell
py -3.12 --version
```

Si esto funciona, puedes utilizar `py -3.12` en los comandos posteriores.

---

# 6. Paso 3 — Comprobar pip

Ejecuta:

```powershell
python -m pip --version
```

Deberías obtener una respuesta parecida a:

```text
pip ... from ... (python 3.12)
```

Si `python` no funciona pero `py -3.12` sí:

```powershell
py -3.12 -m pip --version
```

---

# 7. Paso 4 — Instalar Node.js

El frontend utiliza React y Vite, por lo que necesitas Node.js y npm.

Actualmente Node.js ofrece una versión **LTS**, que es la opción recomendada para un proyecto de este tipo. La página oficial de Node.js muestra las versiones LTS disponibles:

https://nodejs.org/

## 7.1. Descargar Node.js

Ve a:

https://nodejs.org/en/download/

Descarga la versión:

```text
LTS
```

Para un Windows normal de 64 bits, utiliza el instalador:

```text
Windows Installer (.msi)
```

## 7.2. Instalar Node.js

Ejecuta el `.msi`.

Puedes dejar las opciones predeterminadas.

Asegúrate de que se instalen:

```text
Node.js
npm
```

Cuando termine la instalación, cierra PowerShell y abre una terminal nueva.

---

# 8. Paso 5 — Comprobar Node.js y npm

Ejecuta:

```powershell
node --version
```

Debe mostrar una versión.

Después:

```powershell
npm --version
```

Debe mostrar una versión.

Por ejemplo:

```text
v24.x.x
11.x.x
```

La versión exacta puede cambiar con el tiempo.

---

# 9. Paso 6 — Descomprimir AppBanano

Crea una carpeta para tus proyectos.

Por ejemplo:

```text
C:\proyectos
```

Descomprime:

```text
appBanano.zip
```

de manera que quede:

```text
C:\proyectos\appBanano
```

Comprueba que dentro existan:

```text
C:\proyectos\appBanano\backend
C:\proyectos\appBanano\frontend
```

---

# 10. Paso 7 — Abrir PowerShell en el proyecto

Abre PowerShell.

Ejecuta:

```powershell
cd C:\proyectos\appBanano
```

Comprueba:

```powershell
dir
```

Deberías ver:

```text
backend
frontend
```

---

# 11. Paso 8 — Entrar al backend

Ejecuta:

```powershell
cd backend
```

Comprueba:

```powershell
dir
```

Debes encontrar al menos:

```text
requirements.txt
app
.env
```

---

# 12. Paso 9 — Crear el entorno virtual del backend

No vamos a utilizar el `venv` que venía dentro del ZIP.

Vamos a crear uno nuevo para tu computador.

Ejecuta:

```powershell
py -3.12 -m venv venv
```

Si ese comando no funciona pero `python --version` muestra Python 3.12:

```powershell
python -m venv venv
```

Después de unos segundos aparecerá:

```text
backend/
└── venv/
```

---

# 13. Paso 10 — Activar el entorno virtual en Windows

Ejecuta:

```powershell
.\venv\Scripts\Activate.ps1
```

Si funciona, PowerShell mostrará algo parecido a:

```text
(venv) PS C:\proyectos\appBanano\backend>
```

La parte:

```text
(venv)
```

es importante.

Significa que estás trabajando dentro del entorno virtual.

---

# 14. Si Windows bloquea `Activate.ps1`

Puede aparecer un error parecido a:

```text
running scripts is disabled on this system
```

No significa que Python esté mal instalado.

Ejecuta:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Si pregunta si deseas cambiar la política, confirma.

Después vuelve a ejecutar:

```powershell
.\venv\Scripts\Activate.ps1
```

---

# 15. Paso 11 — Actualizar pip

Con `(venv)` activado:

```powershell
python -m pip install --upgrade pip
```

Espera a que termine.

---

# 16. Paso 12 — Instalar las dependencias del backend

Continúa en:

```text
appBanano\backend
```

con `(venv)` activo.

Ejecuta:

```powershell
pip install -r requirements.txt
```

Este comando instala las librerías que necesita FastAPI.

No cierres la terminal hasta que termine.

---

# 17. Paso 13 — Comprobar las dependencias del backend

Puedes ejecutar:

```powershell
pip list
```

Deberías encontrar paquetes relacionados con el proyecto, como:

```text
fastapi
uvicorn
pymongo
python-dotenv
pydantic
starlette
```

No es necesario que las versiones coincidan exactamente con ejemplos de Internet; las versiones instaladas son las determinadas por `requirements.txt`.

---

# 18. Paso 14 — Revisar el archivo `.env`

Dentro de:

```text
appBanano\backend
```

debe existir:

```text
.env
```

Este archivo contiene la configuración de MongoDB.

La aplicación utiliza variables de entorno relacionadas con:

```text
MONGO_URI
DATABASE_NAME
COLLECTION_NAME
```

**No borres estas variables.**

---

# 19. IMPORTANTE — Seguridad del `.env`

El `.env` que viene en el proyecto contiene información de conexión a MongoDB.

No debes:

- Publicarlo en GitHub.
- Compartirlo públicamente.
- Pegarlo en chats o foros.
- Subirlo a un repositorio público.

Si las credenciales fueron expuestas públicamente, es recomendable cambiar la contraseña del usuario de MongoDB Atlas.

---

# 20. Paso 15 — Comprobar MongoDB desde el backend

Con el entorno virtual activado, ejecuta:

```powershell
python -c "from app.database import verificar_mongodb; print(verificar_mongodb())"
```

Si todo está bien, debería devolver:

```text
True
```

Si devuelve:

```text
False
```

revisa:

1. Conexión a Internet.
2. Archivo `.env`.
3. Usuario de MongoDB.
4. Contraseña.
5. URI de MongoDB.
6. Permisos de acceso en MongoDB Atlas.

---

# 21. Paso 16 — Ejecutar el backend en Windows

Desde:

```text
appBanano\backend
```

con `(venv)` activo:

```powershell
uvicorn app.main:app --reload
```

Si todo funciona, aparecerá algo parecido a:

```text
Uvicorn running on http://127.0.0.1:8000
```

**NO cierres esta terminal.**

El backend está ejecutándose aquí:

```text
http://127.0.0.1:8000
```

---

# 22. Paso 17 — Probar el backend en Windows

Abre Chrome, Edge o Firefox.

Visita:

```text
http://127.0.0.1:8000/
```

Debe aparecer una respuesta similar a:

```json
{
  "mensaje": "API funcionando"
}
```

Después prueba:

```text
http://127.0.0.1:8000/api/health/mongodb
```

Debe aparecer algo similar a:

```json
{
  "mongodb": "conectado"
}
```

También puedes abrir:

```text
http://127.0.0.1:8000/docs
```

Esto abre la documentación interactiva de FastAPI.

---

# 23. Paso 18 — Abrir una SEGUNDA terminal para el frontend

No cierres la primera terminal.

Abre otra ventana de PowerShell.

En esta nueva terminal ejecuta:

```powershell
cd C:\proyectos\appBanano\frontend
```

Comprueba:

```powershell
dir
```

Debes encontrar:

```text
package.json
src
```

---

# 24. Paso 19 — Instalar las dependencias del frontend

Ejecuta:

```powershell
npm install
```

Este comando lee:

```text
package.json
```

y descarga las dependencias necesarias.

Entre ellas están las librerías utilizadas por React/Vite.

Cuando termine aparecerá la carpeta:

```text
node_modules
```

---

# 25. Paso 20 — Ejecutar el frontend en Windows

Ejecuta:

```powershell
npm run dev
```

Vite mostrará una dirección similar a:

```text
Local: http://localhost:5173/
```

Abre:

```text
http://localhost:5173
```

Ahora debería aparecer la aplicación.

---

# 26. Windows — Resumen de las dos terminales

## Terminal 1 — Backend

```powershell
cd C:\proyectos\appBanano\backend

.\venv\Scripts\Activate.ps1

uvicorn app.main:app --reload
```

Debe quedar funcionando:

```text
http://127.0.0.1:8000
```

## Terminal 2 — Frontend

```powershell
cd C:\proyectos\appBanano\frontend

npm run dev
```

Debe quedar funcionando:

```text
http://localhost:5173
```

## Aplicación

Abre:

```text
http://localhost:5173
```

---

# PARTE B — INSTALACIÓN EN LINUX

# 27. Paso 1 — Comprobar qué distribución Linux tienes

Abre una terminal y ejecuta:

```bash
cat /etc/os-release
```

Si utilizas Ubuntu, Debian, Linux Mint u otra distribución basada en Debian, puedes seguir los comandos de esta sección.

---

# 28. Paso 2 — Actualizar paquetes

En Ubuntu/Debian:

```bash
sudo apt update
```

Después:

```bash
sudo apt upgrade
```

---

# 29. Paso 3 — Instalar herramientas básicas

Ejecuta:

```bash
sudo apt install -y curl git build-essential
```

Git no es estrictamente necesario para ejecutar el ZIP, pero estas herramientas son útiles para desarrollo.

---

# 30. Paso 4 — Instalar Python

Primero comprueba si ya existe:

```bash
python3 --version
```

También:

```bash
python3.12 --version
```

Si tienes Python 3.12, puedes continuar.

Si no lo tienes, instala Python 3.12 y el módulo para crear entornos virtuales.

En una distribución que tenga los paquetes disponibles:

```bash
sudo apt install -y python3.12 python3.12-venv python3.12-pip
```

Si tu distribución no ofrece `python3.12` directamente mediante APT, consulta el método recomendado por la documentación de tu distribución para instalar Python 3.12.

La documentación oficial de Python 3.12 está disponible en:

https://docs.python.org/3.12/

---

# 31. Paso 5 — Comprobar Python

Ejecuta:

```bash
python3.12 --version
```

Debe aparecer:

```text
Python 3.12.x
```

También:

```bash
python3.12 -m pip --version
```

---

# 32. Paso 6 — Instalar Node.js

Para Linux, Node.js recomienda utilizar un administrador de versiones como `nvm` para instalar Node.js con npm.

La documentación oficial de Node.js muestra el procedimiento de instalación de `nvm` y Node.js:

https://nodejs.org/en/download/

Una vez instalado `nvm`, puedes instalar una versión LTS.

Por ejemplo:

```bash
nvm install 24
```

Después:

```bash
nvm use 24
```

Comprueba:

```bash
node --version
```

y:

```bash
npm --version
```

Node.js mantiene versiones LTS y Current; para este proyecto es preferible una versión LTS. citeturn0search0turn0search9

---

# 33. Paso 7 — Descomprimir AppBanano

Coloca:

```text
appBanano.zip
```

en una carpeta de trabajo.

Por ejemplo:

```text
~/proyectos/
```

Puedes crearla:

```bash
mkdir -p ~/proyectos
```

Descomprime el ZIP desde el administrador de archivos o con:

```bash
unzip appBanano.zip -d ~/proyectos/
```

Si `unzip` no está instalado:

```bash
sudo apt install -y unzip
```

Al terminar deberías tener:

```text
~/proyectos/appBanano
```

---

# 34. Paso 8 — Entrar al backend

Ejecuta:

```bash
cd ~/proyectos/appBanano/backend
```

Comprueba:

```bash
ls
```

Debes encontrar:

```text
app
requirements.txt
.env
```

---

# 35. Paso 9 — Crear el entorno virtual

No utilizaremos el `venv` que venía dentro del ZIP.

Créalo nuevamente:

```bash
python3.12 -m venv venv
```

Esto crea:

```text
backend/
└── venv/
```

---

# 36. Paso 10 — Activar el entorno virtual en Linux

Ejecuta:

```bash
source venv/bin/activate
```

La terminal debería mostrar:

```text
(venv)
```

Por ejemplo:

```text
(venv) usuario@pc:~/proyectos/appBanano/backend$
```

---

# 37. Paso 11 — Actualizar pip

Ejecuta:

```bash
python -m pip install --upgrade pip
```

---

# 38. Paso 12 — Instalar dependencias del backend

Ejecuta:

```bash
pip install -r requirements.txt
```

Espera hasta que termine.

---

# 39. Paso 13 — Comprobar MongoDB

Ejecuta:

```bash
python -c "from app.database import verificar_mongodb; print(verificar_mongodb())"
```

Si todo está correctamente configurado:

```text
True
```

Si devuelve:

```text
False
```

revisa:

- Internet.
- `.env`.
- `MONGO_URI`.
- Usuario.
- Contraseña.
- Permisos de MongoDB Atlas.

---

# 40. Paso 14 — Ejecutar el backend en Linux

Ejecuta:

```bash
uvicorn app.main:app --reload
```

Deberías ver:

```text
Uvicorn running on http://127.0.0.1:8000
```

No cierres esta terminal.

---

# 41. Paso 15 — Probar el backend en Linux

Abre un navegador.

Visita:

```text
http://127.0.0.1:8000/
```

Después:

```text
http://127.0.0.1:8000/api/health/mongodb
```

Y:

```text
http://127.0.0.1:8000/docs
```

---

# 42. Paso 16 — Abrir una segunda terminal

Deja la primera terminal ejecutando FastAPI.

Abre una segunda terminal.

Ejecuta:

```bash
cd ~/proyectos/appBanano/frontend
```

---

# 43. Paso 17 — Instalar dependencias del frontend

Ejecuta:

```bash
npm install
```

Espera hasta que termine.

---

# 44. Paso 18 — Ejecutar el frontend

Ejecuta:

```bash
npm run dev
```

Vite debería mostrar algo parecido a:

```text
Local: http://localhost:5173/
```

Abre:

```text
http://localhost:5173
```

---

# 45. Linux — Resumen de las dos terminales

## Terminal 1 — Backend

```bash
cd ~/proyectos/appBanano/backend

source venv/bin/activate

uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

## Terminal 2 — Frontend

```bash
cd ~/proyectos/appBanano/frontend

npm run dev
```

Frontend:

```text
http://localhost:5173
```

Aplicación:

```text
http://localhost:5173
```

---

# PARTE C — EJECUTAR LA APLICACIÓN DESPUÉS DE LA INSTALACIÓN

Una vez que ya hiciste la instalación inicial, **no necesitas volver a instalar todo**.

Cada vez que quieras trabajar con la aplicación:

## Windows

### Terminal 1

```powershell
cd C:\proyectos\appBanano\backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

### Terminal 2

```powershell
cd C:\proyectos\appBanano\frontend
npm run dev
```

---

## Linux

### Terminal 1

```bash
cd ~/proyectos/appBanano/backend
source venv/bin/activate
uvicorn app.main:app --reload
```

### Terminal 2

```bash
cd ~/proyectos/appBanano/frontend
npm run dev
```

---

# PARTE D — CÓMO SABER SI TODO ESTÁ FUNCIONANDO

Haz estas comprobaciones en orden.

## 1. Python

Windows:

```powershell
python --version
```

Linux:

```bash
python3.12 --version
```

---

## 2. Node.js

```bash
node --version
```

---

## 3. npm

```bash
npm --version
```

---

## 4. Backend

Abre:

```text
http://127.0.0.1:8000/
```

Debe responder:

```json
{
  "mensaje": "API funcionando"
}
```

---

## 5. MongoDB

Abre:

```text
http://127.0.0.1:8000/api/health/mongodb
```

Debe indicar:

```text
conectado
```

---

## 6. Documentación del backend

Abre:

```text
http://127.0.0.1:8000/docs
```

---

## 7. Frontend

Abre:

```text
http://localhost:5173
```

Debe aparecer el dashboard de la aplicación.

---

# PARTE E — ERRORES FRECUENTES

# 46. Error: `python is not recognized`

En Windows:

Prueba:

```powershell
py --version
```

Si funciona:

```powershell
py -3.12 --version
```

Si ninguno funciona, Python no está instalado correctamente o no está disponible en el PATH.

---

# 47. Error: `python3.12: command not found`

En Linux significa que Python 3.12 no está instalado o no está disponible con ese nombre.

Comprueba:

```bash
python3 --version
```

Si tienes una versión diferente, debes instalar Python 3.12 según tu distribución.

---

# 48. Error: `No module named fastapi`

El entorno virtual probablemente no está activado.

Comprueba que aparezca:

```text
(venv)
```

Después:

```bash
pip install -r requirements.txt
```

---

# 49. Error: `npm is not recognized`

En Windows significa normalmente que Node.js no está instalado o la terminal no ha actualizado el PATH.

Cierra PowerShell.

Abre una terminal nueva.

Comprueba:

```powershell
node --version
npm --version
```

---

# 50. Error: `npm: command not found`

En Linux, comprueba:

```bash
node --version
npm --version
```

Si instalaste Node mediante `nvm`, comprueba:

```bash
nvm current
```

Y, si es necesario:

```bash
nvm use 24
```

---

# 51. Error al ejecutar `Activate.ps1`

Windows puede bloquear scripts de PowerShell.

Ejecuta:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Después:

```powershell
.\venv\Scripts\Activate.ps1
```

---

# 52. Error de conexión con MongoDB

Primero comprueba:

```text
http://127.0.0.1:8000/api/health/mongodb
```

Si dice:

```text
desconectado
```

el problema está entre el backend y MongoDB Atlas.

Comprueba:

1. Internet.
2. `.env`.
3. `MONGO_URI`.
4. Usuario de MongoDB.
5. Contraseña.
6. IP permitida en MongoDB Atlas.

**No instales MongoDB local pensando que solucionará este problema.** Esta aplicación utiliza MongoDB Atlas.

---

# 53. Error: el frontend abre pero no aparecen datos

Comprueba primero que el backend esté funcionando.

Abre:

```text
http://127.0.0.1:8000/
```

Después prueba:

```text
http://127.0.0.1:8000/api/datos
```

Si el backend responde correctamente pero el frontend no muestra los datos, el problema probablemente está en la comunicación entre React y FastAPI o en el código del frontend.

---

# 54. Error: el puerto 8000 ya está ocupado

Si FastAPI indica que el puerto 8000 ya está en uso, significa que otro proceso está utilizando ese puerto.

Primero comprueba si ya tienes otra instancia de la aplicación ejecutándose.

No ejecutes varias instancias innecesariamente.

---

# 55. Error: el puerto 5173 ya está ocupado

Vite puede utilizar otro puerto automáticamente, por ejemplo:

```text
http://localhost:5174
```

Utiliza la dirección que aparezca en la terminal.

---

# PARTE F — INSTALACIÓN LIMPIA RECOMENDADA

Si quieres evitar problemas provenientes del ZIP, la instalación recomendada es:

```text
1. Instalar Python 3.12
2. Instalar Node.js LTS
3. Descomprimir appBanano
4. Crear backend/venv nuevo
5. Activar backend/venv
6. Instalar requirements.txt
7. Revisar backend/.env
8. Probar MongoDB
9. Ejecutar FastAPI
10. Abrir segunda terminal
11. Ejecutar npm install
12. Ejecutar npm run dev
13. Abrir localhost:5173
```

No es necesario:

```text
❌ instalar MongoDB Server
❌ instalar Apache
❌ instalar XAMPP
❌ instalar MySQL
❌ instalar PostgreSQL
```

---

# PARTE G — COMANDOS COMPLETOS

## Windows — primera instalación

```powershell
cd C:\proyectos\appBanano\backend

py -3.12 -m venv venv

.\venv\Scripts\Activate.ps1

python -m pip install --upgrade pip

pip install -r requirements.txt

python -c "from app.database import verificar_mongodb; print(verificar_mongodb())"

uvicorn app.main:app --reload
```

## Windows — frontend

En otra terminal:

```powershell
cd C:\proyectos\appBanano\frontend

npm install

npm run dev
```

---

## Linux — primera instalación

```bash
cd ~/proyectos/appBanano/backend

python3.12 -m venv venv

source venv/bin/activate

python -m pip install --upgrade pip

pip install -r requirements.txt

python -c "from app.database import verificar_mongodb; print(verificar_mongodb())"

uvicorn app.main:app --reload
```

## Linux — frontend

En otra terminal:

```bash
cd ~/proyectos/appBanano/frontend

npm install

npm run dev
```

---

# PARTE H — DIRECCIONES IMPORTANTES

| Servicio | Dirección |
|---|---|
| Frontend | `http://localhost:5173` |
| Backend | `http://127.0.0.1:8000` |
| API Docs | `http://127.0.0.1:8000/docs` |
| Health MongoDB | `http://127.0.0.1:8000/api/health/mongodb` |

---

# PARTE I — CHECKLIST DE INSTALACIÓN

## Windows

- [ ] Instalar Python 3.12
- [ ] Comprobar `python --version`
- [ ] Comprobar `pip`
- [ ] Instalar Node.js LTS
- [ ] Comprobar `node --version`
- [ ] Comprobar `npm --version`
- [ ] Descomprimir `appBanano.zip`
- [ ] Entrar en `backend`
- [ ] Crear `venv`
- [ ] Activar `venv`
- [ ] Instalar `requirements.txt`
- [ ] Revisar `.env`
- [ ] Comprobar MongoDB
- [ ] Ejecutar FastAPI
- [ ] Abrir segunda terminal
- [ ] Entrar en `frontend`
- [ ] Ejecutar `npm install`
- [ ] Ejecutar `npm run dev`
- [ ] Abrir `http://localhost:5173`

## Linux

- [ ] Comprobar/instalar Python 3.12
- [ ] Comprobar `pip`
- [ ] Instalar Node.js LTS
- [ ] Comprobar `node --version`
- [ ] Comprobar `npm --version`
- [ ] Descomprimir `appBanano.zip`
- [ ] Entrar en `backend`
- [ ] Crear `venv`
- [ ] Activar `venv`
- [ ] Instalar `requirements.txt`
- [ ] Revisar `.env`
- [ ] Comprobar MongoDB
- [ ] Ejecutar FastAPI
- [ ] Abrir segunda terminal
- [ ] Entrar en `frontend`
- [ ] Ejecutar `npm install`
- [ ] Ejecutar `npm run dev`
- [ ] Abrir `http://localhost:5173`

---

# PARTE J — REGLA PRINCIPAL PARA RECORDAR

Durante el desarrollo local:

```text
TERMINAL 1
Backend
   ↓
FastAPI
   ↓
127.0.0.1:8000
```

y simultáneamente:

```text
TERMINAL 2
Frontend
   ↓
React + Vite
   ↓
localhost:5173
```

La aplicación que ves en el navegador es:

```text
http://localhost:5173
```

pero los datos son proporcionados por:

```text
http://127.0.0.1:8000
```

y el backend obtiene los datos de:

```text
MongoDB Atlas
```

---

# PARTE K — NOTA SOBRE LAS VERSIONES

No es necesario instalar exactamente la última versión disponible de cada programa.

Para este proyecto:

- **Python:** mantener la rama 3.12 es la opción más conservadora.
- **Node.js:** utilizar una versión **LTS**.
- **Dependencias Python:** utilizar `requirements.txt`.
- **Dependencias JavaScript:** utilizar `package.json` y `package-lock.json`.

La documentación oficial de Python confirma la rama 3.12 y su documentación de instalación/uso. citeturn0search12

Node.js publica versiones LTS y recomienda su uso para entornos que buscan estabilidad. citeturn0search0turn0search9

---

# FIN

Si sigues los pasos en el orden indicado, la instalación queda separada en dos procesos:

```text
BACKEND
Python → venv → requirements.txt → FastAPI → puerto 8000

FRONTEND
Node.js → npm install → React/Vite → puerto 5173
```

Y ambos procesos deben estar ejecutándose simultáneamente para utilizar AppBanano.
