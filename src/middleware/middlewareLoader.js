const MiddlewareLoader = (to, from, next) => {
  const nextMiddleware = (options = null) => options;

  const middlewares = to.matched.reduce((carry, record) => {
    if (record.meta.middlewares) {
      return carry.concat(record.meta.middlewares);
    }

    return carry;
  }, []);

  const nextParams = middlewares.reduce((carry, item) => {
    if (carry === null) {
      const params = item(to, from, nextMiddleware);

      return params;
    }

    return carry;
  }, null);

  if (nextParams !== null) {
    return next(nextParams);
  }

  return next();
};

export default MiddlewareLoader;
