function getGreeting(name) {
  const greeting = 'Hello world!';

  if (name && typeof name === 'string' && name.length > 0) {
    const wisher = `From ${name}`;
    return `${greeting} ${wisher}`;
  }

  return greeting;
}

module.exports = { getGreeting };
