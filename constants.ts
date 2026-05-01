export interface PoderQuestion {
  sentence: string;
  options: string[];
  correct: string;
  explanation: string;
}

export const PODER_CONJUGATION = [
  { subject: "Yo", conjugation: "puedo" },
  { subject: "Tú", conjugation: "puedes" },
  { subject: "Él / Ella / Usted", conjugation: "puede" },
  { subject: "Nosotros /as", conjugation: "podemos" },
  { subject: "Vosotros /as", conjugation: "podéis" },
  { subject: "Ellos / Ellas / Ustedes", conjugation: "pueden" }
];

export const PODER_DATA: PoderQuestion[] = [
  { 
    sentence: "Yo ____ hablar español.", 
    options: ["puedo", "puedes", "puede"], 
    correct: "puedo", 
    explanation: "Yo (I) - puedo. Remember the O to UE change in the stem." 
  },
  { 
    sentence: "¿____ (tú) ayudarme?", 
    options: ["Puede", "Puedes", "Podemos"], 
    correct: "Puedes", 
    explanation: "Tú (you informal) - puedes." 
  },
  { 
    sentence: "Él ____ correr rápido.", 
    options: ["puedo", "podemos", "puede"], 
    correct: "puede", 
    explanation: "Él (he) - puede." 
  },
  { 
    sentence: "Nosotros ____ cantar bien.", 
    options: ["pueden", "podemos", "puedo"], 
    correct: "podemos", 
    explanation: "Nosotros (we) - podemos. Important: No stem change here!" 
  },
  { 
    sentence: "Ellos ____ jugar al fútbol.", 
    options: ["pueden", "puede", "puedes"], 
    correct: "pueden", 
    explanation: "Ellos (they) - pueden." 
  },
  { 
    sentence: "Vosotros ____ saltar alto.", 
    options: ["podéis", "puedes", "pueden"], 
    correct: "podéis", 
    explanation: "Vosotros (you all) - podéis. No stem change here!" 
  },
  { 
    sentence: "Usted ____ entrar ahora.", 
    options: ["puedo", "puedes", "puede"], 
    correct: "puede", 
    explanation: "Usted (you formal) - puede." 
  },
  { 
    sentence: "María ____ bailar salsa.", 
    options: ["puede", "pueden", "podemos"], 
    correct: "puede", 
    explanation: "María (she/Ella) - puede." 
  },
  { 
    sentence: "¿____ (ustedes) oírme?", 
    options: ["Puedes", "Pueden", "Podemos"], 
    correct: "Pueden", 
    explanation: "Ustedes (you all) - pueden." 
  },
  { 
    sentence: "Mi perro ____ dormir mucho.", 
    options: ["puedo", "puede", "podemos"], 
    correct: "puede", 
    explanation: "Mi perro (it/he/Él) - puede." 
  },
  { 
    sentence: "Yo no ____ ir al cine.", 
    options: ["podemos", "puede", "puedo"], 
    correct: "puedo", 
    explanation: "Yo (I) - puedo." 
  },
  { 
    sentence: "Tú no ____ comer esto.", 
    options: ["puedes", "puede", "pueden"], 
    correct: "puedes", 
    explanation: "Tú (you) - puedes." 
  },
  { 
    sentence: "Nosotros ____ estudiar hoy.", 
    options: ["pueden", "podemos", "puedo"], 
    correct: "podemos", 
    explanation: "Nosotros (we) - podemos." 
  },
  { 
    sentence: "Mis padres ____ viajar.", 
    options: ["puede", "pueden", "podemos"], 
    correct: "pueden", 
    explanation: "Mis padres (they/Ellos) - pueden." 
  },
  { 
    sentence: "¿Quién ____ contestar?", 
    options: ["puede", "puedo", "pueden"], 
    correct: "puede", 
    explanation: "¿Quién? (Who?) usually takes the 3rd person singular - puede." 
  }
];
