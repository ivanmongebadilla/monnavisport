export const FIRST_NAMES = [
  "Juan", "Carlos", "Luis", "Miguel", "José", "Alejandro", "Diego", "Fernando",
  "Ricardo", "Eduardo", "Javier", "Manuel", "Roberto", "Francisco", "Daniel",
  "Jesús", "Antonio", "Pedro", "Raúl", "Sergio", "Andrés", "Rodrigo", "Emilio",
  "Gustavo", "Héctor", "Iván", "Jorge", "Marco", "Óscar", "Pablo", "Rafael",
  "Salvador", "Tomás", "Vicente", "Adrián", "Bruno", "César", "Enrique",
  "Gabriel", "Ignacio", "Mario", "Martín", "Nicolás", "Omar", "Rubén",
  "Samuel", "Víctor", "Alonso", "Damián", "Ezequiel",
] as const;

export const LAST_NAMES = [
  "Pérez", "López", "García", "Martínez", "Hernández", "González", "Rodríguez",
  "Sánchez", "Ramírez", "Torres", "Flores", "Rivera", "Gómez", "Díaz", "Cruz",
  "Morales", "Reyes", "Ortiz", "Gutiérrez", "Chávez", "Ramos", "Vargas",
  "Castillo", "Jiménez", "Moreno", "Romero", "Álvarez", "Mendoza", "Ruiz",
  "Aguilar", "Medina", "Vázquez", "Contreras", "Guerrero", "Rojas", "Salazar",
  "Navarro", "Cortés", "Delgado", "Estrada", "Espinoza", "Camacho", "Duarte",
  "Fuentes", "Lara", "Maldonado", "Pacheco", "Quiñones", "Solís", "Zamora",
] as const;

export const HOMETOWNS = [
  "Caborca, Sonora", "Hermosillo, Sonora", "Puerto Peñasco, Sonora",
  "Sonoyta, Sonora", "Altar, Sonora", "Pitiquito, Sonora", "Trincheras, Sonora",
  "Magdalena, Sonora",
] as const;

export interface ClubIdentity {
  slug: string;
  name: string;
  city: string;
  initials: string;
  colorPrimary: string;
  colorSecondary: string;
  founded: number;
}

export const CLUBS: ClubIdentity[] = [
  { slug: "toros", name: "Toros", city: "Caborca", initials: "TOR", colorPrimary: "#171717", colorSecondary: "#dc2626", founded: 2010 },
  { slug: "halcones", name: "Halcones", city: "Caborca", initials: "HAL", colorPrimary: "#1d4ed8", colorSecondary: "#e5e7eb", founded: 2008 },
  { slug: "aguilas", name: "Águilas", city: "Altar", initials: "AGU", colorPrimary: "#15803d", colorSecondary: "#fde047", founded: 2012 },
  { slug: "lobos", name: "Lobos", city: "Pitiquito", initials: "LOB", colorPrimary: "#334155", colorSecondary: "#94a3b8", founded: 2015 },
  { slug: "panteras", name: "Panteras", city: "Sonoyta", initials: "PAN", colorPrimary: "#4c1d95", colorSecondary: "#c4b5fd", founded: 2011 },
  { slug: "guerreros", name: "Guerreros", city: "Caborca", initials: "GUE", colorPrimary: "#9a3412", colorSecondary: "#fed7aa", founded: 2009 },
  { slug: "vaqueros", name: "Vaqueros", city: "Trincheras", initials: "VAQ", colorPrimary: "#713f12", colorSecondary: "#fef3c7", founded: 2014 },
  { slug: "tiburones", name: "Tiburones", city: "Puerto Peñasco", initials: "TIB", colorPrimary: "#0e7490", colorSecondary: "#a5f3fc", founded: 2013 },
];

export const VENUES = [
  "Gimnasio Municipal Caborca", "Unidad Deportiva Benito Juárez",
  "Domo del Sur", "Auditorio Municipal", "Cancha Techada Centro",
] as const;
