// Exporta: formatPrecio(n, moneda="COP"), formatFecha(date), truncar(str, max=50)
export const formatPrecio = (n, moneda="COP") =>
  new Intl.NumberFormat("es-CO", { style:"currency", currency:moneda }).format(n);

export const formatFecha = (date=new Date()) =>
  new Intl.DateTimeFormat("es-CO", { dateStyle:"long" }).format(date);

export const truncar = (str, max=50) =>
  str.length <= max ? str : str.slice(0, max).trimEnd() + "…";