# AppBanano — Instalación y ejecución desde Visual Studio Code

Esta guía explica **paso a paso** cómo abrir, instalar y ejecutar la aplicación **AppBanano desde Visual Studio Code**, tanto en **Windows** como en **Linux**.

Está pensada para una persona que recibe el archivo:

```text
appBanano.zip
```

y quiere conseguir que la aplicación quede funcionando en su computador.

---

# 1. ¿Qué vamos a instalar?

AppBanano tiene dos partes:

```text
appBanano/
│
├── backend/       → Python + FastAPI
│
└── frontend/      → React + Vite
```

El funcionamiento es:

```text
Navegador
    │
    │ http://localhost:5173
    ▼
Frontend
React + Vite
    │
    │ HTTP
    ▼
Backend
FastAPI
    │
    │ MongoDB
    ▼
MongoDB Atlas
```

Por lo tanto necesitamos:

- Visual Studio Code
- Python 3.12
- Node.js LTS
- npm
- Las dependencias Python del proyecto
- Las dependencias JavaScript del proyecto
- Acceso a Internet

## No necesitas instalar

- MongoDB Server
- MySQL
- PostgreSQL
- XAMPP
- Apache

El backend utiliza **MongoDB Atlas**, por lo que la base de datos está en la nube.

---

# 2. ¿Por qué vamos a utilizar Visual Studio Code?

Visual Studio Code incluye un **terminal integrado**, por lo que podemos instalar dependencias y ejecutar backend y frontend sin salir del programa. El terminal se puede abrir desde `View > Terminal` o con `Ctrl + `` en Windows y Linux. citeturn0search0turn0search3

Además, VS Code tiene soporte para Python, JavaScript y Node.js mediante sus extensiones y herramientas integradas. citeturn0search1turn0search11

---

# PARTE 1 — WINDOWS

# 3. Instalar Visual Studio Code en Windows

## Paso 1 — Descargar VS Code

Descarga Visual Studio Code desde:

https://code.visualstudio.com/

Para Windows, la instalación **User Setup** es la recomendada para la mayoría de usuarios y no requiere permisos de administrador. citeturn0search2

## Paso 2 — Instalar

Ejecuta el instalador.

Puedes utilizar las opciones predeterminadas.

Después de terminar, abre:

```text
Visual Studio Code
```

---

# 4. Instalar Python en Windows

## Paso 1 — Descargar Python

Descarga Python 3.12 desde:

https://www.python.org/downloads/

Se recomienda Python 3.12 para este proyecto.

## Paso 2 — Instalar Python

Ejecuta el instalador.

En la primera pantalla activa:

```text
Add python.exe to PATH
```

Después selecciona:

```text
Install Now
```

Espera hasta que termine.

---

# 5. Comprobar Python desde VS Code

Cierra VS Code si estaba abierto y vuelve a abrirlo.

Abre el terminal:

```text
View → Terminal
```

También puedes utilizar:

```text
Ctrl + `
```

En Windows normalmente se abrirá PowerShell. VS Code permite trabajar con diferentes shells, incluyendo PowerShell. citeturn0search0turn0search6

Ejecuta:

```powershell
python --version
```

Debe aparecer algo parecido a:

```text
Python 3.12.x
```

También puedes ejecutar:

```powershell
py --version
```

---

# 6. Comprobar pip

En el mismo terminal:

```powershell
python -m pip --version
```

Debe mostrar una versión de pip asociada a Python.

Si `python` no funciona pero `py` sí:

```powershell
py -3.12 -m pip --version
```

---

# 7. Instalar Node.js en Windows

El frontend utiliza React/Vite y necesita Node.js y npm.

VS Code no instala Node.js automáticamente; el runtime de Node.js debe estar instalado en el computador. npm viene incluido con la distribución de Node.js. citeturn0search1

## Paso 1

Ve a:

https://nodejs.org/

Descarga una versión:

```text
LTS
```

## Paso 2

Ejecuta el instalador `.msi`.

Puedes dejar las opciones predeterminadas.

## Paso 3

Cierra VS Code y vuelve a abrirlo.

Esto es importante para que el terminal detecte correctamente `node` y `npm`.

---

# 8. Comprobar Node.js y npm

Abre:

```text
View → Terminal
```

Ejecuta:

```powershell
node --version
```

Después:

```powershell
npm --version
```

Ambos comandos deben devolver una versión.

---

# 9. Descomprimir AppBanano

Descomprime:

```text
appBanano.zip
```

Por ejemplo:

```text
C:\proyectos\appBanano
```

La estructura debería ser:

```text
C:\proyectos\appBanano
│
├── backend
└── frontend
```

---

# 10. Abrir AppBanano en VS Code

En VS Code selecciona:

```text
File → Open Folder
```

Selecciona:

```text
C:\proyectos\appBanano
```

Ahora el panel izquierdo de VS Code debería mostrar:

```text
appBanano
├── backend
└── frontend
```

También puedes abrirlo desde PowerShell:

```powershell
cd C:\proyectos\appBanano
code .
```

El comando `code .` permite abrir la carpeta actual directamente en VS Code. citeturn0search7

---

# 11. Instalar extensiones recomendadas de VS Code

En VS Code pulsa:

```text
Ctrl + Shift + X
```

Esto abre el panel de extensiones.

Instala:

## Python

Busca:

```text
Python
```

e instala la extensión oficial de Microsoft.

## Pylance

Busca:

```text
Pylance
```

e instala la extensión oficial de Microsoft.

## ESLint

Busca:

```text
ESLint
```

e instala la extensión correspondiente para trabajar con JavaScript/React.

Estas extensiones no son estrictamente necesarias para ejecutar la aplicación, pero hacen mucho más cómodo trabajar con el código.

---

# 12. Preparar el backend en Windows

Ahora vamos a preparar:

```text
backend/
```

## Paso 1 — Abrir un terminal nuevo

En VS Code:

```text
Terminal → New Terminal
```

También puedes usar:

```text
Ctrl + Shift + `
```

VS Code permite tener varios terminales abiertos simultáneamente. citeturn0search0

## Paso 2 — Entrar en backend

Si el terminal está en:

```text
C:\proyectos\appBanano>
```

ejecuta:

```powershell
cd backend
```

Ahora deberías estar en:

```text
C:\proyectos\appBanano\backend
```

Comprueba:

```powershell
dir
```

Deberías encontrar:

```text
app
requirements.txt
.env
```

---

# 13. Crear el entorno virtual Python

Vamos a crear un entorno virtual nuevo.

Ejecuta:

```powershell
py -3.12 -m venv venv
```

Si `py` no funciona pero `python` sí:

```powershell
python -m venv venv
```

Esto creará:

```text
backend/
│
├── app/
├── requirements.txt
├── .env
└── venv/
```

---

# 14. Activar el entorno virtual en Windows

Ejecuta:

```powershell
.\venv\Scripts\Activate.ps1
```

Si funciona, el terminal debe mostrar algo parecido a:

```text
(venv) PS C:\proyectos\appBanano\backend>
```

La palabra:

```text
(venv)
```

significa que el entorno virtual está activo.

---

# 15. Si PowerShell bloquea la activación

Si aparece un mensaje parecido a:

```text
running scripts is disabled on this system
```

ejecuta:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Confirma el cambio.

Después vuelve a ejecutar:

```powershell
.\venv\Scripts\Activate.ps1
```

---

# 16. Seleccionar el Python correcto en VS Code

Este paso es importante.

Presiona:

```text
Ctrl + Shift + P
```

Escribe:

```text
Python: Select Interpreter
```

Selecciona el Python que esté dentro de:

```text
backend\venv
```

Debería verse parecido a:

```text
Python 3.12.x ('venv')
```

Así VS Code utilizará el entorno virtual del proyecto.

---

# 17. Instalar dependencias del backend

Con:

```text
(venv)
```

activo, ejecuta:

```powershell
python -m pip install --upgrade pip
```

Después:

```powershell
pip install -r requirements.txt
```

Espera hasta que termine.

---

# 18. Revisar el `.env`

Dentro de:

```text
backend
```

debe existir:

```text
.env
```

El backend utiliza información de conexión a MongoDB.

Entre las variables utilizadas por la aplicación están:

```text
MONGO_URI
DATABASE_NAME
COLLECTION_NAME
```

No elimines esas variables.

---

# 19. Importante: MongoDB

**No instales MongoDB localmente.**

Esta aplicación está preparada para conectarse a:

```text
MongoDB Atlas
```

Necesitas:

```text
Internet
+
credenciales válidas
+
acceso permitido en MongoDB Atlas
```

---

# 20. Comprobar MongoDB desde VS Code

En el terminal del backend ejecuta:

```powershell
python -c "from app.database import verificar_mongodb; print(verificar_mongodb())"
```

Si funciona correctamente:

```text
True
```

Si aparece:

```text
False
```

hay un problema con la conexión a MongoDB.

Revisa:

- `.env`
- `MONGO_URI`
- usuario
- contraseña
- conexión a Internet
- permisos de acceso en MongoDB Atlas

---

# 21. Ejecutar el backend desde VS Code

En el terminal donde aparece:

```text
(venv)
```

ejecuta:

```powershell
uvicorn app.main:app --reload
```

Deberías ver:

```text
Uvicorn running on http://127.0.0.1:8000
```

No cierres este terminal.

---

# 22. Probar el backend

Abre el navegador.

Primero:

```text
http://127.0.0.1:8000/
```

Después:

```text
http://127.0.0.1:8000/api/health/mongodb
```

Y finalmente:

```text
http://127.0.0.1:8000/docs
```

Si estas direcciones funcionan, el backend está funcionando.

---

# 23. Abrir un segundo terminal en VS Code

Ahora necesitamos ejecutar el frontend.

**No cierres el terminal del backend.**

En VS Code:

```text
Terminal → New Terminal
```

Ahora tendrás:

```text
Terminal 1 → Backend
Terminal 2 → Frontend
```

---

# 24. Entrar en frontend

En el segundo terminal:

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

# 25. Instalar dependencias del frontend

Ejecuta:

```powershell
npm install
```

Espera hasta que termine.

Se creará:

```text
node_modules/
```

---

# 26. Ejecutar el frontend

Ejecuta:

```powershell
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

Ahora debería aparecer AppBanano.

---

# 27. Así debe quedar VS Code en Windows

Al final tendrás dos terminales.

## Terminal 1

```text
appBanano/backend
```

con:

```text
(venv)
```

y:

```powershell
uvicorn app.main:app --reload
```

## Terminal 2

```text
appBanano/frontend
```

con:

```powershell
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

---

# PARTE 2 — LINUX

# 28. Instalar Visual Studio Code en Linux

VS Code tiene paquetes oficiales para distribuciones Debian/Ubuntu, RPM y Snap, además de otras opciones según la distribución. citeturn0search8

Para Ubuntu/Debian puedes descargar el paquete `.deb` desde:

https://code.visualstudio.com/

Después puedes instalarlo desde el centro de software o mediante:

```bash
sudo apt install ./archivo.deb
```

---

# 29. Abrir VS Code

Después de instalarlo, abre:

```text
Visual Studio Code
```

También puedes abrirlo desde un terminal con:

```bash
code
```

---

# 30. Instalar Python en Linux

Abre el terminal de VS Code:

```text
View → Terminal
```

Comprueba:

```bash
python3 --version
```

También:

```bash
python3.12 --version
```

Para este proyecto recomendamos Python 3.12.

En Ubuntu/Debian, si el paquete está disponible:

```bash
sudo apt update
```

Después:

```bash
sudo apt install python3.12 python3.12-venv python3.12-pip
```

Comprueba:

```bash
python3.12 --version
```

---

# 31. Instalar Node.js en Linux

El frontend necesita Node.js y npm.

Instala una versión LTS de Node.js.

Puedes utilizar el método recomendado para tu distribución o `nvm`.

Después comprueba:

```bash
node --version
```

y:

```bash
npm --version
```

VS Code documenta que Node.js debe instalarse aparte y que npm viene incluido con Node.js. citeturn0search1

---

# 32. Descomprimir AppBanano en Linux

Por ejemplo:

```bash
mkdir -p ~/proyectos
```

Coloca:

```text
appBanano.zip
```

en esa carpeta.

Puedes descomprimir:

```bash
unzip appBanano.zip -d ~/proyectos/
```

Si `unzip` no existe:

```bash
sudo apt install unzip
```

La estructura final debe ser:

```text
~/proyectos/appBanano
│
├── backend
└── frontend
```

---

# 33. Abrir AppBanano en VS Code

Desde el terminal:

```bash
cd ~/proyectos/appBanano
```

Después:

```bash
code .
```

VS Code abrirá directamente la carpeta del proyecto. El comando `code .` está soportado por VS Code en Windows y Linux. citeturn0search7

---

# 34. Instalar extensiones de VS Code

Presiona:

```text
Ctrl + Shift + X
```

Instala:

```text
Python
Pylance
ESLint
```

La extensión Python proporciona soporte de desarrollo para Python dentro de VS Code. citeturn0search11

---

# 35. Abrir el terminal de VS Code

Selecciona:

```text
View → Terminal
```

O:

```text
Ctrl + `
```

En Linux normalmente utilizarás Bash.

---

# 36. Entrar al backend

Ejecuta:

```bash
cd backend
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

# 37. Crear el entorno virtual

Ejecuta:

```bash
python3.12 -m venv venv
```

Se creará:

```text
backend/venv
```

---

# 38. Activar el entorno virtual

Ejecuta:

```bash
source venv/bin/activate
```

Ahora deberías ver:

```text
(venv)
```

al principio de la línea.

---

# 39. Seleccionar Python en VS Code

Presiona:

```text
Ctrl + Shift + P
```

Escribe:

```text
Python: Select Interpreter
```

Selecciona:

```text
backend/venv
```

Debería ser Python 3.12.

---

# 40. Instalar dependencias Python

Ejecuta:

```bash
python -m pip install --upgrade pip
```

Después:

```bash
pip install -r requirements.txt
```

Espera hasta que termine.

---

# 41. Comprobar MongoDB

Ejecuta:

```bash
python -c "from app.database import verificar_mongodb; print(verificar_mongodb())"
```

Debe devolver:

```text
True
```

Si devuelve:

```text
False
```

comprueba:

- `.env`
- `MONGO_URI`
- usuario
- contraseña
- Internet
- permisos de MongoDB Atlas

---

# 42. Ejecutar backend en Linux

Ejecuta:

```bash
uvicorn app.main:app --reload
```

Deberías ver:

```text
Uvicorn running on http://127.0.0.1:8000
```

No cierres este terminal.

---

# 43. Probar backend

Abre:

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

# 44. Abrir segundo terminal

En VS Code:

```text
Terminal → New Terminal
```

Ahora tendrás:

```text
Terminal 1 → Backend
Terminal 2 → Frontend
```

---

# 45. Entrar en frontend

En el segundo terminal:

```bash
cd ~/proyectos/appBanano/frontend
```

Comprueba:

```bash
ls
```

Debes encontrar:

```text
package.json
src
```

---

# 46. Instalar dependencias frontend

Ejecuta:

```bash
npm install
```

Espera hasta que termine.

---

# 47. Ejecutar frontend

Ejecuta:

```bash
npm run dev
```

Vite debería mostrar:

```text
Local: http://localhost:5173/
```

Abre:

```text
http://localhost:5173
```

---

# 48. Así debe quedar VS Code en Linux

## Terminal 1

Ruta:

```text
appBanano/backend
```

Entorno:

```text
(venv)
```

Comando:

```bash
uvicorn app.main:app --reload
```

## Terminal 2

Ruta:

```text
appBanano/frontend
```

Comando:

```bash
npm run dev
```

Aplicación:

```text
http://localhost:5173
```

---

# PARTE 3 — EJECUTAR LA APLICACIÓN EN EL FUTURO

Una vez realizada la instalación inicial, **no tienes que repetir `pip install` ni `npm install` cada vez**.

Solo tienes que iniciar los dos servicios.

---

# 49. Windows — ejecución normal

Abre AppBanano en VS Code.

## Terminal 1

```powershell
cd C:\proyectos\appBanano\backend
```

Activa el entorno:

```powershell
.\venv\Scripts\Activate.ps1
```

Ejecuta:

```powershell
uvicorn app.main:app --reload
```

## Terminal 2

```powershell
cd C:\proyectos\appBanano\frontend
```

Ejecuta:

```powershell
npm run dev
```

Después abre:

```text
http://localhost:5173
```

---

# 50. Linux — ejecución normal

## Terminal 1

```bash
cd ~/proyectos/appBanano/backend
```

Activa el entorno:

```bash
source venv/bin/activate
```

Ejecuta:

```bash
uvicorn app.main:app --reload
```

## Terminal 2

```bash
cd ~/proyectos/appBanano/frontend
```

Ejecuta:

```bash
npm run dev
```

Después abre:

```text
http://localhost:5173
```

---

# PARTE 4 — QUÉ TERMINALES DEBES TENER ABIERTOS

Cuando la aplicación esté funcionando:

```text
┌─────────────────────────────────────────────┐
│ VS CODE                                     │
│                                             │
│ Terminal 1                                  │
│ backend                                     │
│                                             │
│ (venv)                                      │
│ uvicorn app.main:app --reload               │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ Terminal 2                                  │
│ frontend                                    │
│                                             │
│ npm run dev                                 │
│                                             │
└─────────────────────────────────────────────┘
```

Y en el navegador:

```text
http://localhost:5173
```

---

# PARTE 5 — CÓMO DETENER LA APLICACIÓN

Para detener cualquiera de los servicios:

En su terminal presiona:

```text
Ctrl + C
```

Por ejemplo:

```text
Terminal 1 → Ctrl + C
Terminal 2 → Ctrl + C
```

---

# PARTE 6 — COMPROBACIÓN COMPLETA

Si quieres comprobar que todo funciona, hazlo en este orden.

## 1. Python

Windows:

```powershell
python --version
```

Linux:

```bash
python3.12 --version
```

Debe ser Python 3.12.x.

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

```text
http://127.0.0.1:8000/api/health/mongodb
```

Debe indicar:

```text
conectado
```

---

## 6. API

```text
http://127.0.0.1:8000/docs
```

---

## 7. Frontend

```text
http://localhost:5173
```

---

# PARTE 7 — ERRORES FRECUENTES

# 51. VS Code no encuentra Python

Presiona:

```text
Ctrl + Shift + P
```

Busca:

```text
Python: Select Interpreter
```

Selecciona:

```text
backend/venv
```

Después comprueba:

```bash
python --version
```

---

# 52. Windows no permite activar `venv`

Ejecuta:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Después:

```powershell
.\venv\Scripts\Activate.ps1
```

---

# 53. `pip install` falla

Primero asegúrate de tener:

```text
(venv)
```

Después:

```bash
python -m pip install --upgrade pip
```

y:

```bash
pip install -r requirements.txt
```

---

# 54. `npm` no existe

Comprueba:

```bash
node --version
npm --version
```

Si ambos comandos fallan, Node.js no está correctamente instalado.

Después de instalar Node.js, **reinicia VS Code** para que el terminal vuelva a cargar las variables de entorno. VS Code también recomienda abrir un terminal nuevo después de instalar Node.js para que `node` y `npm` estén disponibles en el PATH. citeturn0search1

---

# 55. El backend funciona pero el frontend no

Comprueba que estén abiertos los dos terminales:

```text
Backend → puerto 8000
Frontend → puerto 5173
```

Prueba primero:

```text
http://127.0.0.1:8000/
```

Si funciona, prueba:

```text
http://localhost:5173
```

---

# 56. MongoDB aparece como desconectado

Comprueba:

```text
http://127.0.0.1:8000/api/health/mongodb
```

Si aparece:

```text
desconectado
```

revisa el archivo:

```text
backend/.env
```

y la conexión a MongoDB Atlas.

No instales MongoDB localmente para solucionar este problema.

---

# 57. Puerto 8000 ocupado

Si aparece un error indicando que:

```text
Address already in use
```

comprueba que no tengas otra instancia del backend ejecutándose.

Puedes cerrar el proceso anterior con:

```text
Ctrl + C
```

---

# 58. Puerto 5173 ocupado

Vite puede mostrar otro puerto disponible.

Por ejemplo:

```text
http://localhost:5174
```

Utiliza la dirección que indique el terminal.

---

# PARTE 8 — ESTRUCTURA FINAL EN VS CODE

Cuando abras el proyecto correctamente deberías ver:

```text
APPBANANO
│
├── backend
│   │
│   ├── app
│   │   ├── main.py
│   │   ├── database.py
│   │   └── routes
│   │
│   ├── requirements.txt
│   ├── .env
│   └── venv
│
└── frontend
    │
    ├── src
    │
    ├── package.json
    ├── package-lock.json
    └── node_modules
```

Las carpetas:

```text
backend/venv
frontend/node_modules
```

son instalaciones locales y pueden recrearse.

---

# PARTE 9 — INSTALACIÓN COMPLETA EN WINDOWS EN RESUMEN

Si estás empezando desde cero:

```powershell
# 1. Entrar al proyecto
cd C:\proyectos\appBanano

# 2. Backend
cd backend

# 3. Crear entorno virtual
py -3.12 -m venv venv

# 4. Activarlo
.\venv\Scripts\Activate.ps1

# 5. Instalar dependencias
python -m pip install --upgrade pip
pip install -r requirements.txt

# 6. Ejecutar backend
uvicorn app.main:app --reload
```

Abrir otro terminal:

```powershell
# 7. Frontend
cd C:\proyectos\appBanano\frontend

# 8. Instalar dependencias
npm install

# 9. Ejecutar frontend
npm run dev
```

Abrir:

```text
http://localhost:5173
```

---

# PARTE 10 — INSTALACIÓN COMPLETA EN LINUX EN RESUMEN

```bash
# 1. Entrar al proyecto
cd ~/proyectos/appBanano

# 2. Backend
cd backend

# 3. Crear entorno virtual
python3.12 -m venv venv

# 4. Activarlo
source venv/bin/activate

# 5. Instalar dependencias
python -m pip install --upgrade pip
pip install -r requirements.txt

# 6. Ejecutar backend
uvicorn app.main:app --reload
```

Abrir otro terminal:

```bash
# 7. Frontend
cd ~/proyectos/appBanano/frontend

# 8. Instalar dependencias
npm install

# 9. Ejecutar frontend
npm run dev
```

Abrir:

```text
http://localhost:5173
```

---

# PARTE 11 — CHECKLIST FINAL

## Windows

- [ ] Instalar VS Code
- [ ] Instalar Python 3.12
- [ ] Comprobar Python
- [ ] Instalar Node.js LTS
- [ ] Comprobar Node.js
- [ ] Comprobar npm
- [ ] Descomprimir AppBanano
- [ ] Abrir AppBanano en VS Code
- [ ] Instalar extensiones Python/Pylance/ESLint
- [ ] Crear `backend/venv`
- [ ] Activar `venv`
- [ ] Seleccionar `backend/venv` como intérprete
- [ ] Ejecutar `pip install -r requirements.txt`
- [ ] Revisar `.env`
- [ ] Comprobar MongoDB
- [ ] Ejecutar FastAPI
- [ ] Abrir segundo terminal
- [ ] Ejecutar `npm install`
- [ ] Ejecutar `npm run dev`
- [ ] Abrir `http://localhost:5173`

## Linux

- [ ] Instalar VS Code
- [ ] Instalar Python 3.12
- [ ] Comprobar Python
- [ ] Instalar Node.js LTS
- [ ] Comprobar Node.js
- [ ] Comprobar npm
- [ ] Descomprimir AppBanano
- [ ] Abrir AppBanano en VS Code
- [ ] Instalar extensiones Python/Pylance/ESLint
- [ ] Crear `backend/venv`
- [ ] Activar `venv`
- [ ] Seleccionar `backend/venv` como intérprete
- [ ] Ejecutar `pip install -r requirements.txt`
- [ ] Revisar `.env`
- [ ] Comprobar MongoDB
- [ ] Ejecutar FastAPI
- [ ] Abrir segundo terminal
- [ ] Ejecutar `npm install`
- [ ] Ejecutar `npm run dev`
- [ ] Abrir `http://localhost:5173`

---

# PARTE 12 — DIRECCIONES IMPORTANTES

| Servicio | Dirección |
|---|---|
| Aplicación | `http://localhost:5173` |
| Backend | `http://127.0.0.1:8000` |
| Documentación FastAPI | `http://127.0.0.1:8000/docs` |
| Health MongoDB | `http://127.0.0.1:8000/api/health/mongodb` |

---

# PARTE 13 — REGLA SIMPLE

Para utilizar AppBanano desde VS Code recuerda:

```text
              VS CODE
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
   TERMINAL 1        TERMINAL 2
        │                 │
        ▼                 ▼
    BACKEND           FRONTEND
    FastAPI           React/Vite
        │                 │
   :8000              :5173
        │                 │
        └───────┬─────────┘
                │
                ▼
             NAVEGADOR
                │
                ▼
       http://localhost:5173
```

**No cierres ninguno de los dos terminales mientras estés utilizando la aplicación.**

---

# PARTE 14 — SEGURIDAD

El archivo:

```text
backend/.env
```

puede contener credenciales reales de MongoDB.

No lo publiques en GitHub ni lo compartas públicamente.

Para una distribución profesional de la aplicación, sería preferible entregar:

```text
backend/.env.example
```

con valores de ejemplo y pedir al usuario que configure sus propias credenciales.

---

# FIN DE LA GUÍA
