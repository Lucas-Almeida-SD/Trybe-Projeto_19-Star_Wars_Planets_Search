const formatName = (name) => {
  const splitName = name.split('_');
  splitName.forEach((e, index) => {
    splitName[index] = `${e[0].toUpperCase()}${e.slice(1)}`;
  });
  return splitName.join(' ');
};

export default formatName;
