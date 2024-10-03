export const mock = (value) => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          data: value,
        }),
      200
    );
  });
};
