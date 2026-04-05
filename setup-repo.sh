#!/bin/bash

# ─────────────────────────────────────────
#  setup-repo.sh
#  Crea la estructura completa del repo de aprendizaje
#  Uso: bash setup-repo.sh [nombre-del-repo]
# ─────────────────────────────────────────

REPO_NAME=${1:-"dev-playground"}
ROOT="./$REPO_NAME"

echo "📁 Creando repo: $REPO_NAME"

# ─── LENGUAJES ───────────────────────────
LANGUAGES=("php" "javascript" "html-css" "python" "c" "cpp" "java" "sql")
LEVELS=("basics" "intermediate" "advanced" "mini-projects")

for lang in "${LANGUAGES[@]}"; do
  for level in "${LEVELS[@]}"; do
    mkdir -p "$ROOT/languages/$lang/$level"
    cat > "$ROOT/languages/$lang/$level/README.md" <<EOF
# $lang / $level

Ejercicios de nivel \`$level\` en **$lang**.

## Estructura de cada ejercicio
Cada ejercicio vive en su propia carpeta:
\`\`\`
01-nombre-ejercicio/
├── [archivo de código]   ← implementación
├── notes.md              ← teoría, contexto, referencias
└── bugs.md               ← errores encontrados y cómo se resolvieron
\`\`\`
EOF
  done

  cat > "$ROOT/languages/$lang/README.md" <<EOF
# $lang

Repaso y aprendizaje de **$lang** desde cero hasta nivel avanzado.

| Nivel | Descripción |
|-------|-------------|
| basics | Sintaxis, tipos, estructuras base |
| intermediate | Patrones, estructuras de datos, buenas prácticas |
| advanced | Optimización, arquitectura, casos complejos |
| mini-projects | Proyectos pequeños autocontenidos |
EOF
done

# ─── LABS ────────────────────────────────
LABS=("algorithms" "design-patterns" "concepts" "experiments")
LAB_DESC=(
  "Algoritmos clásicos y de práctica: ordenamiento, búsqueda, grafos, etc."
  "Patrones de diseño: creacionales, estructurales, de comportamiento."
  "Conceptos aplicados: async, concurrencia, memoria, recursión, etc."
  "Zona libre. Cosas raras, novedosas, pruebas sin categoría fija."
)

for i in "${!LABS[@]}"; do
  lab="${LABS[$i]}"
  desc="${LAB_DESC[$i]}"
  mkdir -p "$ROOT/labs/$lab"
  cat > "$ROOT/labs/$lab/README.md" <<EOF
# labs / $lab

$desc

## Estructura sugerida
\`\`\`
$lab/
└── 01-nombre/
    ├── [código]
    ├── notes.md
    └── bugs.md
\`\`\`
EOF
done

# ─── PROJECTS ────────────────────────────
mkdir -p "$ROOT/projects"
cat > "$ROOT/projects/README.md" <<EOF
# projects

Mini proyectos que combinan múltiples lenguajes o tecnologías.
A diferencia de los \`mini-projects\` dentro de cada lenguaje, aquí viven
proyectos que cruzan stacks o tienen mayor alcance.

## Estructura sugerida
\`\`\`
projects/
└── nombre-proyecto/
    ├── README.md     ← qué hace, cómo correrlo, decisiones técnicas
    ├── src/
    ├── notes.md
    └── bugs.md
\`\`\`
EOF

# ─── DOCS ────────────────────────────────
mkdir -p "$ROOT/docs/theory"
mkdir -p "$ROOT/docs/references"
mkdir -p "$ROOT/docs/learnings"

cat > "$ROOT/docs/theory/README.md" <<EOF
# docs / theory

Conceptos generales que no pertenecen a un ejercicio específico.
Ejemplos: cómo funciona el stack/heap, qué es OOP, paradigmas, etc.

Formato sugerido para cada archivo: \`concepto-nombre.md\`
EOF

cat > "$ROOT/docs/references/README.md" <<EOF
# docs / references

Links, libros, cursos y recursos en los que te basaste.
Útil para rastrear de dónde vino cada conocimiento.

## Plantilla de entrada
\`\`\`
## Título del recurso
- **Tipo:** libro / curso / artículo / video
- **URL / ISBN:** 
- **Temas que cubre:** 
- **Notas:** 
\`\`\`
EOF

cat > "$ROOT/docs/learnings/README.md" <<EOF
# docs / learnings

Reflexiones y resúmenes de lo aprendido por etapa o período.
Útil para ver tu progresión y recordar decisiones pasadas.

Formato sugerido: \`YYYY-MM-nombre-tema.md\`
EOF

# ─── .gitignore ──────────────────────────
cat > "$ROOT/.gitignore" <<'EOF'
# OS
.DS_Store
Thumbs.db

# Editors
.vscode/
.idea/
*.swp
*.swo

# Python
__pycache__/
*.pyc
*.pyo
.env
venv/
.venv/

# Node
node_modules/
npm-debug.log

# PHP
vendor/
composer.lock

# Java
*.class
*.jar
target/

# C / C++
*.o
*.out
*.exe
*.dSYM/

# SQL
*.sqlite
*.db
EOF

# ─── README principal ────────────────────
cat > "$ROOT/README.md" <<EOF
# 🕸️ dev-playground

Repo personal de aprendizaje y experimentación.  
Repaso de lenguajes conocidos + exploración de nuevos + laboratorios de conceptos.

## Estructura

\`\`\`
dev-playground/
├── languages/        ← ejercicios por lenguaje (basics → advanced → mini-projects)
├── labs/             ← algoritmos, patrones, conceptos, experimentos libres
├── projects/         ← proyectos que cruzan tecnologías
└── docs/             ← teoría, referencias y reflexiones de aprendizaje
\`\`\`

## Lenguajes cubiertos
PHP · JavaScript · HTML+CSS · Python · C · C++ · Java · SQL  
*(y los que se vayan sumando)*

## Convención por ejercicio
Cada ejercicio vive en su propia carpeta numerada:
\`\`\`
01-nombre-ejercicio/
├── [archivo de código]
├── notes.md              ← teoría, contexto, en qué te basaste
└── bugs.md               ← errores encontrados y cómo los resolviste
\`\`\`

## Niveles
| Nivel | Descripción |
|-------|-------------|
| basics | Sintaxis, tipos, estructuras base |
| intermediate | Patrones, estructuras de datos, buenas prácticas |
| advanced | Optimización, arquitectura, casos complejos |
| mini-projects | Proyectos pequeños autocontenidos por lenguaje |
EOF

# ─── DONE ────────────────────────────────
echo ""
echo "✅ Estructura creada en: $ROOT"
echo ""
echo "Próximos pasos:"
echo "  cd $REPO_NAME"
echo "  git init"
echo "  git add ."
echo "  git commit -m 'chore: initial repo structure'"
echo "  # luego conectar con tu repo en GitHub"
EOF
