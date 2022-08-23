export const generateComment = (idArray) => {
  const commentData = [
    { id: '1',
      author: 'Ilya O\'Reilly1',
      comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
      date: '2019-05-11T16:12:32.554Z',
      emotion: 'smile'
    },
    { id: '2',
      author: 'Ilya O\'Reilly2',
      comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
      date: '2019-05-11T16:12:32.554Z',
      emotion: 'smile'
    },
    {
      id: '3',
      author: 'Ilya O\'Reilly3',
      comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
      date: '2019-05-11T16:12:32.554Z',
      emotion: 'smile'
    },
  ];

  const tmpArr = commentData.filter((it) => {
    for(const elem of idArray)
    {
      if (Number(it.id) === Number(elem)) {
        return true;
      }
    }
  });

  return tmpArr;
};
