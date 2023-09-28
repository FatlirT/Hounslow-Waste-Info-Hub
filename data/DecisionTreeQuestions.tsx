export type Question = {
  id: number;
  question: string;
  answers: Array<Answer>;
  serviceID: string;
};

export type Answer = {
  id: string;
  answer: string;
  followUpQuestion: number;
};

export const houseQuestions = [
  {
    id: 0,
    question: "Is the item too big to fit in an empty bin?",
    answers: [
      {
        id: "a",
        answer: "Yes",
        followUpQuestion: 1,
      },
      {
        id: "b",
        answer: "No",
        followUpQuestion: 2,
      },
    ],
    serviceID: "",
  },
  {
    id: 1,
    question: "You can use the bulky waste collection service!",
    answers: [],
    serviceID: "house-bulky-waste-collection-service",
  },
  {
    id: 2,
    question: "What material is it made of?",
    answers: [
      {
        id: "c",
        answer: "Plastic / Metal",
        followUpQuestion: 3,
      },
      {
        id: "d",
        answer: "Cardboard / Paper",
        followUpQuestion: 4,
      },
      {
        id: "e",
        answer: "Glass",
        followUpQuestion: 5,
      },
      {
        id: "f",
        answer: "Textiles",
        followUpQuestion: 6,
      },
      {
        id: "g",
        answer: "Food",
        followUpQuestion: 7,
      },
      {
        id: "h",
        answer: "Natural / Organic",
        followUpQuestion: 8,
      },
      {
        id: "i",
        answer: "Other",
        followUpQuestion: 9,
      },
    ],
    serviceID: "",
  },
  {
    id: 3,
    question: "You can use the red recycling box!",
    answers: [],
    serviceID: "house-plastic-and-metal-recycling-service",
  },
  {
    id: 4,
    question: "You can use the blue recycling box!",
    answers: [],
    serviceID: "house-paper-and-card-recycling-service",
  },
  {
    id: 5,
    question: "You can use the green recycling box!",
    answers: [],
    serviceID: "house-glass-recycling-service",
  },
  {
    id: 6,
    question:
      "You can use a clearly marked plastic bag and put it alongside your recycling boxes!",
    answers: [],
    serviceID: "house-textile-recycling-service",
  },
  {
    id: 7,
    question: "You can use the food waste bin!",
    answers: [],
    serviceID: "house-food-waste-recycling-service",
  },
  {
    id: 8,
    question: "Is it infectious (blood / tissue)?",
    answers: [
      {
        id: "j",
        answer: "Yes",
        followUpQuestion: 10,
      },
      {
        id: "k",
        answer: "No",
        followUpQuestion: 11,
      },
    ],
    serviceID: "",
  },
  {
    id: 9,
    question: "Is it an electrical appliance?",
    answers: [
      {
        id: "l",
        answer: "Yes",
        followUpQuestion: 12,
      },
      {
        id: "m",
        answer: "No",
        followUpQuestion: 13,
      },
    ],
    serviceID: "",
  },
  {
    id: 10,
    question: "You can use the clinical waste collection service!",
    answers: [],
    serviceID: "house-clinical-waste-collection-service",
  },
  {
    id: 11,
    question: "You can use the brown wheeled bin!",
    answers: [],
    serviceID: "house-garden-waste-recycling-service",
  },
  {
    id: 12,
    question:
      "You can use a clearly marked plastic bag and put it alongside your recycling boxes!",
    answers: [],
    serviceID: "house-small-electrical-items-recycling-service",
  },
  {
    id: 13,
    question:
      "Sorry, this item is rubbish and cannot be recycled. Please use the black wheeled bin!",
    answers: [],
    serviceID: "house-general-waste-collection-service",
  },
];

export const flatQuestions = [
  {
    id: 0,
    question: "Is the item too big to fit in an empty bin?",
    answers: [
      {
        id: "a",
        answer: "Yes",
        followUpQuestion: 1,
      },
      {
        id: "b",
        answer: "No",
        followUpQuestion: 2,
      },
    ],
    serviceID: "",
  },
  {
    id: 1,
    question: "You can use the bulky waste collection service!",
    answers: [],
    serviceID: "flat-bulky-waste-collection-service",
  },
  {
    id: 2,
    question: "What material is it made of?",
    answers: [
      {
        id: "c",
        answer: "Plastic",
        followUpQuestion: 3,
      },
      {
        id: "d",
        answer: "Metal",
        followUpQuestion: 4,
      },
      {
        id: "e",
        answer: "Cardboard",
        followUpQuestion: 5,
      },
      {
        id: "f",
        answer: "Paper",
        followUpQuestion: 6,
      },
      {
        id: "g",
        answer: "Glass",
        followUpQuestion: 7,
      },
      {
        id: "h",
        answer: "Textiles",
        followUpQuestion: 8,
      },
      {
        id: "i",
        answer: "Food",
        followUpQuestion: 9,
      },
      {
        id: "j",
        answer: "Natural / Organic",
        followUpQuestion: 10,
      },
      {
        id: "k",
        answer: "Other",
        followUpQuestion: 11,
      },
    ],
    serviceID: "",
  },
  {
    id: 3,
    question:
      "You can use a communal bin with a red 'household plastic packaging' label!",
    answers: [],
    serviceID: "flat-plastic-recycling-service",
  },
  {
    id: 4,
    question:
      "You can use a communal bin with a grey 'tins, cans & aerosols' label!",
    answers: [],
    serviceID: "flat-metal-recycling-service",
  },
  {
    id: 5,
    question: "You can use a communal bin with a blue 'cardboard' label!",
    answers: [],
    serviceID: "flat-card-recycling-service",
  },
  {
    id: 6,
    question: "You can use a communal bin with a blue 'paper' label!",
    answers: [],
    serviceID: "flat-paper-recycling-service",
  },
  {
    id: 7,
    question: "You can use a communal bin with a teal 'mixed glass' label!",
    answers: [],
    serviceID: "flat-glass-recycling-service",
  },
  {
    id: 8,
    question:
      "You can utilise TRAID charity and Salvation Army Textile Banks to get your textiles recycled!",
    answers: [],
    serviceID: "flat-textiles-recycling",
  },
  {
    id: 9,
    question: "You can use a communal bin with a green 'food waste' label!",
    answers: [],
    serviceID: "flat-food-waste-recycling-service",
  },

  {
    id: 10,
    question: "Is it infectious (blood / tissue)?",
    answers: [
      {
        id: "l",
        answer: "Yes",
        followUpQuestion: 12,
      },
      {
        id: "m",
        answer: "No",
        followUpQuestion: 13,
      },
    ],
    serviceID: "",
  },
  {
    id: 11,
    question: "Is it an electrical appliance?",
    answers: [
      {
        id: "n",
        answer: "Yes",
        followUpQuestion: 14,
      },
      {
        id: "o",
        answer: "No",
        followUpQuestion: 13,
      },
    ],
    serviceID: "",
  },
  {
    id: 12,
    question: "You can use the clinical waste collection service!",
    answers: [],
    serviceID: "flat-clinical-waste-collection-service",
  },
  {
    id: 13,
    question:
      "Sorry, this item is rubbish and cannot be recycled. Please use a communal bin with a black 'general waste' label!",
    answers: [],
    serviceID: "flat-general-waste-collection-service",
  },
  {
    id: 14,
    question:
      "You can utilise TRAID charity as an opportunity to get your small electrical appliances recycled!",
    answers: [],
    serviceID: "flat-small-electrical-items-recycling",
  },
];
