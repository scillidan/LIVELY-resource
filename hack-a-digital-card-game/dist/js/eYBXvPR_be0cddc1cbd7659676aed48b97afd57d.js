class UtilityController {
  constructor() {
    console.log('%c 🛠️ Utilities module active', 'color: #26c3ff');
    this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  }

  // Set the seed and seed state from the specified string
  setSeed(seed) {
    this.seedString = seed;
    this._seedString = new Math.seedrandom(this.seedString);
    this._seedRandom = Math.abs(this._seedString.int32());
    this.m = 0x80000000;
    this.a = 1103515245;
    this.c = 12345;
    this.state = this._seedRandom ? this._seedRandom : Math.floor(Math.random() * (this.m - 1));
  }

  // Resets the state back to the first based on original seed
  resetSeed() {
    this.setSeed(this.seedString);
  }

  generateString(length) {
    let result = ' ';
    const charactersLength = this.characters.length;
    for (let i = 0; i < length; i++) {
      result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  randomSeed(length) {
    this.setSeed(this.generateString(length)); // Re evaluate seed
    vm.reset(); // Invoke the reset function on the Vue instance to re-evaluate all data that was set using a seed
  }

  // Update the seed from the specified input value
  updateSeed() {
    let input = document.getElementById('seedSetter'); // Get the value from the input
    this.setSeed(input.value); // Re evaluate seed
    vm.reset(); // Invoke the reset function on the Vue instance to re-evaluate all data that was set using a seed
  }

  // Return the seed string
  getSeed() {
    return this.seedString;
  }

  // Output the seed change form using the v-html directive
  // e.g haml
  // %form{'@submit.prevent' => "enJin.utils.updateSeed()"}
  //   %div{"v-html" => "enJin.utils.renderSeedForm()"}

  renderSeedForm(btnText = 'Set seed') {
    return `<input id="seedSetter" value='${this.getSeed()}' type='text'><button>${btnText}</button>`;
  }

  nextInt() {
    if (!this.seedString) {
      console.warn('Attempted to use seeded function without setting a seed');
    }

    this.state = (this.a * this.state + this.c) % this.m;
    return this.state;
  }

  //
  // seedRandomBetween()
  //
  // Returns a value in the array based on a predictably random integer and is based on the supplied seed
  // The function requires a 32bit integer
  //

  seedRandomBetween(start, end) {
    let rangeSize = end + 1 - start;
    let randomUnder1 = this.nextInt() / this.m;
    return start + Math.floor(randomUnder1 * rangeSize);
  }

  //
  // seedRandomInArray()
  //
  // Returns a value in the array based on a predictably random integer and is based on the supplied seed
  // The function requires a 32bit integer
  //

  seedRandomInArray(array) {
    let rangeSize = array.length;
    let randomUnder1 = this.nextInt() / this.m;
    return array[Math.floor(randomUnder1 * rangeSize)];
  }

  //
  // randomBetween()
  //
  // Returns a random number between the min and max supplied.
  // This is not based on the seed and uses Math.Random()
  //

  randomBetween(min, max) {
    let number = Math.floor(Math.random() * max) + min;
    return number;
  }

  //
  // randomInArray()
  //
  // Returns a random value in the array between the min and max supplied. 
  // This is not based on the seed and uses Math.Random()
  //

  randomInArray(array) {
    let range = array.length;
    let number = Math.floor(Math.random() * range) + 0;
    return array[number];
  }

  shuffle(array, amount = 1000) {
    array = array.map(value => ({ value, sort: Math.floor(Math.random() * amount) })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);

    return array;
  }}