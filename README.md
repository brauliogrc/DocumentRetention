# Document Retention

## 0.0.1 Full document CRUD

Visualización de documentos completa en los componentes "doc-viwer.component" y "show-results.component". Ademas de la implementación de un visor de PDFs en el el mismo sitio, el cual se encuentra en el componente "pdf-viwer.component".
Toda la visualización de los documentos de encuentra en el módulo "firs-view.module"

Creación de nuevos documentos en componente "docs-creation.component" del módulo "capturist.module".
El componente de creación consta solo de un botón, el cual llama a un PopUp creado con "MatDialog", el cual muestra un componente como si fuera un PopUp permitiendo aislar la lógica del PopUp.

La modificación de la información de los documentos se encuentra en el módulo "admin.module", en el componente "documents.component".
Se implementó una tabla que muestra todos los documentos registrados hasta el momento, cada uno con sus respectivos botónes para su eliminación y editado.
El botón para editar un documento llama a un PopUp, al igual que el componente "docs-creation.component", donde se muestran los campos correspondientes a editar del documento.
