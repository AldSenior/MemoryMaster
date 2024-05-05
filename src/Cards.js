export const Cards = [
  {
    title: "Найди пару",
    img: "../imgs/cardlogo.png",
    link: "/SettingMemory",
    gameLink: "/MemoryGame",
    activity: localStorage.getItem("timeOnMemory"),
    record: localStorage.getItem("recordMemory"),
    GameRules:
      "1. На игровом поле лежит набор карточек, которые располагаются лицевой стороной вниз.  2. Игрок открывает две любые карточки. Если изображения на них совпадают, они остаются открытыми.  3. Если изображения не совпадают, карточки закрываются, и игрок продолжает попытки.  4. Цель игры - открыть все пары карточек за минимальное количество ходов.",
    DIFF_NAMES: [
      {
        diff: "4x4",
        kolvo: 8,
      },
      {
        diff: "6x6",
        kolvo: 18,
      },
      {
        diff: "8x8",
        kolvo: 32,
      },
    ],
  },
  {
    title: "Последовательность цифр",
    img: "../imgs/cardNumber.jpg",
    link: "/SettingMemory",
    record: localStorage.getItem("recordNumbers"),
    gameLink: "/Numbers",
    activity: localStorage.getItem("timeOnNumberGame"),
    GameRules:
      "1. На игровом поле лежат круги, на которых изображены числа. 2.Игрок должен нажать на карточки в последовательности увеличения чисел, для запоминания дают 5-3 секунд (зависит от уровня сложности). 3.Если игрок нажимает на них в правильной последовательности, то ему дают 1 балл, иначе засчитывает одну ошибку",
    DIFF_NAMES: [
      {
        diff: "Лёгкий",
        kolvo: 5,
      },
      {
        diff: "Средний",
        kolvo: 4,
      },
      {
        diff: "Тяжёлый",
        kolvo: 3,
      },
    ],
  },
  {
    title: "Порядок чисел",
    img: "../imgs/logo_MemorOrderNumGame.jpg",
    link: "/SettingMemory",
    gameLink: "/NumbersOrders",
    activity: localStorage.getItem("timeNumberOrderGame"),
    record: localStorage.getItem("recordNumberOrder"),
    GameRules:
      "1. На игровом поле расположены квадраты и числами, игроку надо нажать на них в правильной последовательности за минимальное время.Если игрок допускает ошибку, то к секундомеру добавляется 1 секунда",
    DIFF_NAMES: [
      {
        diff: "4x4",
        kolvo: 16,
      },
      {
        diff: "5x5",
        kolvo: 25,
      },
      {
        diff: "6x6",
        kolvo: 36,
      },
    ],
  },
];
