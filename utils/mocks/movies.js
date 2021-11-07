const data = {
  initialState: {
    user: {},
    playing: {},
    searchResult: [],
    myList: [],
    trends: [
      {
        title: 'Notti bianche, Le (White Nights)',
        year: 2019,
        cover: 'http://dummyimage.com/800x600.png/ff4444/ffffff',
        description:
          'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
        duration: 66,
        contentRating: 'G',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        tags: [
          'Action|Adventure',
          'Action|Adventure|Thriller',
          'Horror|Western',
          'Horror|Thriller',
          'Comedy|Romance|Sci-Fi',
          'Adventure|Animation|Children|Comedy|Fantasy',
          'Drama',
        ],
      },
      {
        title: "King Solomon's Mines",
        year: 2019,
        cover: 'http://dummyimage.com/800x600.png/dddddd/000000',
        description:
          'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
        duration: 77,
        contentRating: 'NC-17',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        tags: [
          'Comedy',
          'War',
          'Drama|Horror',
          'Comedy|Drama|Romance',
          'Drama|Thriller',
          'Comedy',
          'Action|Drama|War',
          'Drama',
        ],
      },
      {
        title: 'Inhuman Resources (Redd Inc.)',
        year: 2018,
        cover: 'http://dummyimage.com/800x600.png/ff4444/ffffff',
        description:
          'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
        duration: 142,
        contentRating: 'PG',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        tags: ['Crime|Drama|Thriller'],
      },
      {
        title: 'Fortress',
        year: 2019,
        cover: 'http://dummyimage.com/800x600.png/cc0000/ffffff',
        description:
          'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
        duration: 172,
        contentRating: 'PG',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        tags: ['Drama', 'Drama|Mystery|Thriller', 'Drama|Thriller'],
      },
      {
        title: 'Transylmania',
        year: 2018,
        cover: 'http://dummyimage.com/800x600.png/ff4444/ffffff',
        description:
          'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
        duration: 155,
        contentRating: 'G',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        tags: [
          'Crime|Drama|Mystery|Thriller',
          'Crime|Drama|Mystery|Thriller',
          'Comedy|Sci-Fi',
          'Adventure|Comedy|Sci-Fi',
          'Drama',
        ],
      },
      {
        title: "Big Girls Don't Cry... They Get Even (Stepkids)",
        year: 2018,
        cover: 'http://dummyimage.com/800x600.png/ff4444/ffffff',
        description:
          'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.',
        duration: 173,
        contentRating: 'R',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        tags: ['Action|Drama', 'Comedy'],
      },
      {
        title: 'Amreeka',
        year: 2018,
        cover: 'http://dummyimage.com/800x600.png/ff4444/ffffff',
        description:
          'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.',
        duration: 115,
        contentRating: 'R',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        tags: ['Comedy|Romance', 'Drama|Thriller', 'Animation|Children'],
      },
      {
        title: 'Hollow Man',
        year: 2018,
        cover: 'http://dummyimage.com/800x600.png/ff4444/ffffff',
        description:
          'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
        duration: 158,
        contentRating: 'NC-17',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        tags: ['Drama', 'Thriller'],
      },
      {
        title: 'Hard Target',
        year: 2018,
        cover: 'http://dummyimage.com/800x600.png/dddddd/000000',
        description:
          'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
        duration: 173,
        contentRating: 'PG',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        tags: [
          'Animation|Comedy',
          'Documentary',
          'Action|Fantasy|Horror',
          'Thriller',
          'Comedy|Crime',
          'Drama',
        ],
      },
      {
        title: 'Siete minutos (Seven Minutes)',
        year: 2019,
        cover: 'http://dummyimage.com/800x600.png/5fa2dd/ffffff',
        description:
          'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
        duration: 62,
        contentRating: 'PG',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        tags: ['Action|Adventure|Comedy|Drama|War', 'Animation', 'Drama'],
      },
    ],
    originals: [
      {
        id: 8,
        slug: 'tvshow-8',
        title: 'Stargate Atlantis',
        type: 'Action',
        language: 'English',
        year: 2012,
        contentRating: '16+',
        duration: 148,
        cover: 'http://dummyimage.com/800x600.png/306880/ffffff',
        description: 'Vestibulum ac est lacinia nisi venenatis tristique',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
      {
        id: 9,
        slug: 'tvshow-9',
        title: 'Alien Highway',
        type: 'Action',
        language: 'English',
        year: 2019,
        contentRating: '16+',
        duration: 128,
        cover: 'http://dummyimage.com/800x600.png/604180/ffffff',
        description: 'Vestibulum ac est lacinia nisi venenatis tristique',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      },
      {
        id: 10,
        slug: 'tvshow-10',
        title: 'Elementary',
        type: 'Animation',
        language: 'English',
        year: 2011,
        contentRating: '16+',
        duration: 346,
        cover: 'http://dummyimage.com/800x600.png/FF91BA/ffffff',
        description: 'Vestibulum ac est lacinia nisi venenatis tristique',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      },
      {
        id: 11,
        slug: 'tvshow-11',
        title: 'Strange Angel',
        type: 'War',
        language: 'English',
        year: 2015,
        contentRating: '16+',
        duration: 226,
        cover: 'http://dummyimage.com/800x600.png/45807C/ffffff',
        description: 'Vestibulum ac est lacinia nisi venenatis tristique',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
      },
      {
        id: 12,
        slug: 'tvshow-12',
        title: 'Private Eyes',
        type: 'Comedy',
        language: 'English',
        year: 2018,
        contentRating: '16+',
        duration: 190,
        cover: 'http://dummyimage.com/800x600.png/577380/ffffff',
        description: 'Vestibulum ac est lacinia nisi venenatis tristique',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      },
      {
        id: 13,
        slug: 'tvshow-13',
        title: 'NCIS: Los Angeles',
        type: 'Drama',
        language: 'English',
        year: 2010,
        contentRating: '16+',
        duration: 160,
        cover: 'http://dummyimage.com/800x600.png/5472FF/ffffff',
        description: 'Vestibulum ac est lacinia nisi venenatis tristique',
        source:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
      },
    ],
  },
};

const moviesMock = data.initialState.trends;

function filterMockMovies(tag) {
  return moviesMock.filter((movie) => movie.type.includes(tag));
}

//El Mock Service ayuda a realizar los tests de las rutas
//Para comprobar que las respuestas a las peticiones
//mandan datos.
class MockService {
  async getMovies() {
    return Promise.resolve(moviesMock);
  }
  async createMovie() {
    return Promise.resolve(moviesMock[0]);
  }
}
//Se exporta toda la lista (Mocks) y el servicio.
module.exports = {
  moviesMock,
  filterMockMovies,
  MockService,
};
