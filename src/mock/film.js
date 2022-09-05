import {nanoid} from 'nanoid';
import {getRandomInteger} from '../utils/common';
import {FILMS} from './const';

export const generateFilm = () => {
  const randomImg = 'images/posters/' + FILMS[getRandomInteger(0,FILMS.length-1)];
  return {
    'id': nanoid(),
    'comments': [
      1, 2, 3
    ],
    'film_info': {
      'title': 'A Little Pony Without The Carpet',
      'alternative_title': 'Laziness Who Sold Themselves',
      'total_rating': 5.3,
      'poster': randomImg,
      'age_rating': 0,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano'
      ],
      'actors': [
        'Morgan Freeman'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'Finland'
      },
      'runtime': 77,
      'genre': [
        'Comedy', 'Comedy', 'Comedy'
      ],
      'description': 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic \'Nu, Pogodi!\' and \'Alice in Wonderland\', with the best fight scenes since Bruce Lee.'
    },
    'user_details': {
      'watchlist': true,
      'already_watched': true,
      'watching_date': '2019-04-12T16:12:32.554Z',
      'favorite': true
    }
  }
};

