// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to the Toy Store",
          price: "Price",
          name: "Name",
          discount: "Discounted Price",
          edit: "Edit",
          details: "Details",
          filter: "Filter Toys",
          filterByName: "By Name:",
          filterByPrice: "By Price:",
          filterLabels: "Labels",
          sort: "Sort",
          sortBy: "Sort by",
          sortDirectionAsc: "Asc",
          sortDirectionDesc: "Desc",
          inStock: "In Stock",
          created: "Created",
        },
      },
      es: {
        translation: {
          welcome: "Bienvenido a la tienda de juguetes",
          price: "Precio",
          name: "Nombre", 
          discount: "Precio con descuento",
          edit: "Editar",   
          details: "Detalles",
          filter: "Filtrar Juguetes",
          filterByName: "Por Nombre:",
          filterByPrice: "Por Precio:",
          filterLabels: "Etiquetas",
          sort: "Ordenar",
          sortBy: "Ordenar por",
          sortDirectionAsc: "Ascendente",
          sortDirectionDesc: "Descendente",
          inStock: "En Stock",
          created: "Creado",
        },
      },
    },
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, 
    },
  })


