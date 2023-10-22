class Storage {
  get(key, fallback = null) {
    const data = localStorage.getItem(key);
    if (data == null) {
      return fallback;
    }

    try {
      return JSON.parse(data);
    } catch {
      return fallback;
    }
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

const storage = new Storage();

export default storage;
